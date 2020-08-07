const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const institutionRoute = '/institutions';
const session = '/institution-sessions';

describe('Institution', () => {
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
    test('Criar Instituição com dados válidos', async () => {
      const institution = await factory.attrs('Institution');

      const response = await request(app)
        .post(institutionRoute)
        .send(institution);

      expect(response.statusCode).toBe(201);
    });

    test('Erro ao criar Instituição com CNPJ duplicado', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const response = await request(app)
        .post(institutionRoute)
        .send(institution);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar Instituição com CNPJ inválido', async () => {
      const institution = await factory.attrs('Institution', {
        cnpj: '00000000000000'
      });

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const response = await request(app)
        .post(institutionRoute)
        .send(institution);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar Instituição com CNPJ da mantenedora inválido', async () => {
      const institution = await factory.attrs('Institution', {
        cnpjMantenedora: '00000000000000'
      });

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const response = await request(app)
        .post(institutionRoute)
        .send(institution);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar Instituição com e-mail duplicado', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      institution.cnpj = '11527680000112';

      const response = await request(app)
        .post(institutionRoute)
        .send(institution);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('READ', () => {
    test('Retornar uma Instutição', async () => {
      const institution = await factory.attrs('Institution');

      const institutionResponse = await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(session)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;
      const { _id } = institutionResponse.body;

      const response = await request(app)
        .get(`${institutionRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });
  });

  describe('UPDATE', () => {
    test('Atualizar Instituição com dados válidos', async () => {
      const institution = await factory.attrs('Institution');

      const institutionResponse = await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(session)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;
      const { _id } = institutionResponse.body;

      const response = await request(app)
        .put(`${institutionRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(institution);

      expect(response.statusCode).toBe(200);
    });
  });
});
