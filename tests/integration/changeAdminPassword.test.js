const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const adminRoute = '/admins';
const adminSessionRoute = '/admin-sessions';
const changePasswordRoute = '/change-password';

describe('Change Admin Password', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const URI = await mongoServer.getUri();

    mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    const promises = [];
    for (const collection of collections) {
      promises.push(collection.deleteMany());
    }
    await Promise.all(promises);
  });

  describe('UPDATE', () => {
    test('Alterar senha do Admin com dados válido', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = responseAdminSession.body;

      const response = await request(app)
        .put(`${changePasswordRoute}/admin`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: '123123',
          password: '123456',
          confirmPassword: '123456'
        });

      expect(response.statusCode).toBe(200);
    });

    test('Erro ao alterar senha com senha antida inválida', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = responseAdminSession.body;

      const response = await request(app)
        .put(`${changePasswordRoute}/admin`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: '123456',
          password: '123456',
          confirmPassword: '123456'
        });

      expect(response.statusCode).toBe(401);
    });

    test('Erro ao alterar senha com nova senha inválida', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = responseAdminSession.body;

      const response = await request(app)
        .put(`${changePasswordRoute}/admin`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: '123123',
          password: '123456',
          confirmPassword: '654321'
        });

      expect(response.statusCode).toBe(400);
    });
  });
});
