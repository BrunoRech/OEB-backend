const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const formRoute = '/forms';
const adminRoute = '/admins';
const adminSessionRoute = '/admin-sessions';

describe('Form', () => {
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

  describe('READ', () => {
    test("Retornar todos os formulários para o Adm", async () => {
      const form = await factory.attrs("Form");
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        })

      const { token } = responseAdminSession.body;

      await request(app).post(formRoute).send(form).set('Authorization', `Bearer ${token}`);

      const response = await request(app)
        .get(formRoute)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    })

    test("Retornar um formulário para o Adm", async () => {
      const form = await factory.attrs("Form");
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        })

      const { token } = responseAdminSession.body;

      const responseForm = await request(app).post(formRoute).send(form).set('Authorization', `Bearer ${token}`);

      const { _id } = responseForm.body;

      const response = await request(app)
        .get(`${formRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    })
  });

  describe('CREATE', () => {
    test("Criar formulário com dados válidos", async () => {
      const admin = await factory.attrs('Admin');
      const form = await factory.attrs("Form");

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        })

      const { token } = responseAdminSession.body;

      const response = await request(app).post(formRoute).send(form).set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    })
  });

  describe('UPDATE', () => { });

  describe('DELETE', () => { });

});
