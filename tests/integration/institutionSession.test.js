const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const feature = '/institutions';
const session = '/institution-sessions';

describe('Institution Session ', () => {
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
    test('Criar Sessão com dados válidos', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(feature)
        .send(institution);

      const response = await request(app)
        .post(session)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      expect(response.statusCode).toBe(200);
    });
    test('Erro ao autenticar Instituição com e-mail inválido', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(feature)
        .send(institution);

      const response = await request(app)
        .post(session)
        .send({
          cnpj: '78629717000194',
          senha: '123123'
        });

      expect(response.statusCode).toBe(401);
    });
    test('Erro ao autenticar Instituição com senha inválida', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(feature)
        .send(institution);

      const response = await request(app)
        .post(session)
        .send({
          cnpj: institution.cnpj,
          senha: '123456'
        });

      expect(response.statusCode).toBe(401);
    });
  });
});
