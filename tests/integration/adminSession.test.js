const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const feature = '/admins';
const session = '/admin-sessions';

describe('Admin Session ', () => {
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
    test('Criar sessão com dados válidos', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(feature)
        .send(admin);

      const response = await request(app)
        .post(session)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      expect(response.statusCode).toBe(200);
    });
    test('Erro ao criar sessão com cpf não existente', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(feature)
        .send(admin);

      const response = await request(app)
        .post(session)
        .send({
          cpf: '08125535942',
          senha: '123123'
        });

      expect(response.statusCode).toBe(401);
    });
    test('Erro ao criar sessão com senha inválida', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(feature)
        .send(admin);

      const response = await request(app)
        .post(session)
        .send({
          cpf: admin.cpf,
          senha: '123456'
        });

      expect(response.statusCode).toBe(401);
    });
  });
});
