const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const adminRoute = '/admins';
const session = '/admin-sessions';

describe('Admin', () => {
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

  describe('CREATE', () => {
    test('Criar Admin com campos válidos', async () => {
      const admin = await factory.attrs('Admin');

      const response = await request(app)
        .post(adminRoute)
        .send(admin);
      expect(response.statusCode).toBe(201);
    });

    test('Erro ao criar Admin com CPF duplicado', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const response = await request(app)
        .post(adminRoute)
        .send(admin);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar Admin com CPF inválido', async () => {
      const admin = await factory.attrs('Admin', { cpf: '00000000000' });

      const response = await request(app)
        .post(adminRoute)
        .send(admin);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar Admin com e-mail duplicado', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      admin.cpf = '08125535942';

      const response = await request(app)
        .post(adminRoute)
        .send(admin);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('READ', () => {
    test('Retornar um Admin', async () => {
      const admin = await factory.attrs('Admin');

      const createdAdminResponse = await request(app)
        .post(adminRoute)
        .send(admin);

      const { _id } = createdAdminResponse.body;

      const responseSession = await request(app)
        .post(session)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const response = await request(app)
        .get(`${adminRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });

    test('Erro ao retornar Admin com id inválido', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseSession = await request(app)
        .post(session)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const response = await request(app)
        .get(`${adminRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao retornar Admin com token inválido', async () => {
      const response = await request(app).get(
        `${adminRoute}/5d979b4ed7730c0e1c7db1aa`
      );
      expect(response.statusCode).toBe(401);
    });
  });

  describe('UPDATE', () => {
    test('Alterar os campos de um Admin', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseSession = await request(app)
        .post(session)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = responseSession.body;

      admin.name = 'test';

      const response = await request(app)
        .put(adminRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(admin);

      expect(response.statusCode).toBe(200);
    });
  });
});
