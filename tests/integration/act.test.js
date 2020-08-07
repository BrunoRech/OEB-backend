const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const institutionRoute = '/institutions';
const sessionRoute = '/institution-sessions';
const actRoute = '/acts';
const poleRoute = '/poles';

describe('Act', () => {
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
    test('Retornar todos os Atos da Instituição', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('Act');

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const response = await request(app)
        .get(actRoute)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });

    test('Retornar um Ato', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('Act');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      const response = await request(app)
        .get(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
    });

    test('Erro ao retornar um Ato com um id inválido', async () => {
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
        .get(`${actRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('CREATE', () => {
    test('Criar um Ato com campos válidos', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('Act');

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(201);
    });

    test('Criar um Ato com curso profissional e campos válidos', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('ProfessionalAct');

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(201);
    });

    test('Criar um Ato EAD com campos válidos', async () => {
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

      const { _id } = poleResponse;

      const act = await factory.attrs('EADAct', { polos: [_id] });

      const response = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(201);
    });

    test('Criar um Ato de currículo próprio e campos válidos', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(201);
    });

    test('Erro ao criar um Ato com validade do tipo ato inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct', {
        validadeTipoAto: '2012-03-18T15:55:16.097Z'
      });

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar um Ato com validade parecer inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct', {
        validadeParecer: '2012-03-18T15:55:16.097Z'
      });

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao crir um Ato com validade currículo inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct', {
        validadeCurriculo: '2012-03-18T15:55:16.097Z'
      });

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao criar um Ato de currículo próprio sem currículo', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct', { curriculo: '' });

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ai criar um Ato com curso profissional sem o campo curso', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('ProfessionalAct', { curso: '' });

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Criar um Ato EAD sem Polos associados', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('EADAct', { polos: [] });

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
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(201);
    });
  });

  describe('UPDATE', () => {
    test('Atualizar Ato', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');
      const newAct = await factory.attrs('OwnCurriculumAct');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      const response = await request(app)
        .put(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAct);

      expect(response.statusCode).toBe(200);
    });

    test('Atualizar Ato de currículo próprio', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');
      const newAct = await factory.attrs('Act');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      const response = await request(app)
        .put(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAct);

      expect(response.statusCode).toBe(200);
    });

    test('Atualizar Ato EAD', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');
      const newAct = await factory.attrs('EADAct');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      const response = await request(app)
        .put(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAct);

      expect(response.statusCode).toBe(200);
    });

    test('Erro ao atualizar Ato com validade do ato inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      act.validadeTipoAto = '2012-03-18T15:55:16.097Z';
      const response = await request(app)
        .put(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao atualizar Ato com validade parecer inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      act.validadeParecer = '2012-03-18T15:55:16.097Z';
      const response = await request(app)
        .put(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao atualizar Ato com validade currículo inválida', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      act.validadeCurriculo = '2012-03-18T15:55:16.097Z';
      const response = await request(app)
        .put(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE', () => {
    test('Deletar Ato de currículo próprio', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('OwnCurriculumAct');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      const response = await request(app)
        .delete(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(204);
    });

    test('Deletar Ato', async () => {
      const institution = await factory.attrs('Institution');
      const act = await factory.attrs('Act');

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

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${token}`)
        .send(act);

      const { _id } = actResponse.body;

      const response = await request(app)
        .delete(`${actRoute}/${_id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(204);
    });

    test('Erro ao deletar Ato com id inválido', async () => {
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
        .delete(`${actRoute}/5d979b4ed7730c0e1c7db1aa`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
