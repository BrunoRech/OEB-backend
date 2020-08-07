const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const institutionRoute = '/institutions';
const actRoute = '/acts';
const poleRoute = '/poles';
const institutionSessionRoute = '/institution-sessions';
const associatePoleRoute = '/associate-pole';

describe('Associate Pole', () => {
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
    test('Retornar todos os polos assiciados', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const response = await request(app)
        .get(`${associatePoleRoute}/${actId}`)
        .set('Authorization', `Bearer ${institutionToken}`);

      const { body } = response;
      expect(body.length).toBe(1);
      expect(response.statusCode).toBe(200);
    });

    test('Erro ao retornar todos os Polos associados com id inválido', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const response = await request(app)
        .get(`${associatePoleRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${institutionToken}`);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('CREATE', () => {
    test('Criar associação de Polo', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      const response = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      expect(response.statusCode).toBe(201);
    });

    test('Erro ao criar associação duas vezes', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const response = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar associação com id do Ato inválido', async () => {
      const institution = await factory.attrs('Institution');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;

      actPole.polo = poleId;
      actPole.ato = '5d979b4ed7730c0e1c7db1aa';

      const response = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar associação com id do Polo inválido', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const { _id: actId } = actResponse.body;

      actPole.polo = '5d979b4ed7730c0e1c7db1aa';
      actPole.ato = actId;

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const response = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar associação com Ato não EAD', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('Act');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      const response = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar associação com data inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole', {
        validadeAto: '2012-03-18T15:55:16.097Z'
      });

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      const response = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE', () => {
    test('Deletar uma associação', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      const actPoleResponse = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const { _id: actPoleId } = actPoleResponse.body;

      const response = await request(app)
        .delete(`${associatePoleRoute}/${actPoleId}`)
        .set('Authorization', `Bearer ${institutionToken}`);

      expect(response.statusCode).toBe(204);
    });

    test('Deletar duas associações', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse1 = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const poleResponse2 = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: pole1Id } = poleResponse1.body;
      const { _id: pole2Id } = poleResponse2.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = pole1Id;
      actPole.ato = actId;

      const actPoleResponse = await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      actPole.polo = pole2Id;

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const { _id: actPoleId } = actPoleResponse.body;

      const response = await request(app)
        .delete(`${associatePoleRoute}/${actPoleId}`)
        .set('Authorization', `Bearer ${institutionToken}`);

      expect(response.statusCode).toBe(204);
    });

    test('Erro ao deletar associação com id inválido', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct');
      const pole = await factory.attrs('Pole');
      const actPole = await factory.attrs('ActPole');

      await request(app)
        .post(institutionRoute)
        .send(institution);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const { token: institutionToken } = responseInstitutionSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const poleResponse = await request(app)
        .post(poleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(pole);

      const { _id: poleId } = poleResponse.body;
      const { _id: actId } = actResponse.body;

      actPole.polo = poleId;
      actPole.ato = actId;

      await request(app)
        .post(associatePoleRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(actPole);

      const response = await request(app)
        .delete(`${associatePoleRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${institutionToken}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
