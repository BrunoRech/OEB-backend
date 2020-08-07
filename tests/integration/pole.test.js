const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const institutionRoute = '/institutions';
const sessionRoute = '/institution-sessions';
const actRoute = '/acts';
const poleRoute = '/poles';
const associatePoleRoute = '/associate-pole';

describe('Pole', () => {
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
    test('Retornar Polos da Instutição logada', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(pole);

      const response = await request(app)
        .get(poleRoute)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });

    test('Retornar um Polo', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(pole);

      const { _id } = poleResponse.body;

      const response = await request(app)
        .get(`${poleRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });

    test('Erro ao retornar Polo com id inválido', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const response = await request(app)
        .get(`${poleRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('CREATE', () => {
    test('Criar Polo com dados inválido', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const response = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(pole);

      expect(response.statusCode).toBe(201);
    });
  });

  describe('UPDATE', () => {
    test('Atualizar Polo com dados válidos', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');
      const newPole = await factory.attrs('Pole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(pole);

      const { _id } = poleResponse.body;

      const response = await request(app)
        .put(`${poleRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPole);

      expect(response.statusCode).toBe(200);
    });
  });

  describe('DELETE', () => {
    test('Deletar Polo', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(pole);

      const { _id } = poleResponse.body;

      const response = await request(app)
        .delete(`${poleRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(204);
    });

    test('Erro ao deletar Polo com id inválido', async () => {
      const institution = await factory.attrs('Institution');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const response = await request(app)
        .delete(`${poleRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao deletar Polo com vinculação existente', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseSession = await request(app)
        .post(sessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token } = responseSession.body;

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;

      const act = await factory.attrs('EADAct');

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id: actId } = actResponse.body;

      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${token}`)
        .send({ ato: actId, polo: poleId, ...actPole });

      const response = await request(app)
        .delete(`${poleRoute}/${poleId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
