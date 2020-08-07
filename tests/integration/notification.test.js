const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const adminRoute = '/admins';
const validateActRoute = '/validate-act';
const institutionRoute = '/institutions';
const actRoute = '/acts';
const institutionSessionRoute = '/institution-sessions';
const adminSessionRoute = '/admin-sessions';
const notificationRoute = '/notifications';

describe('Notification', () => {
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
    test('Retornar uma lista de Notificações', async () => {
      const institution = await factory.attrs('Institution');
      const admin = await factory.attrs('Admin');
      const act = await factory.attrs('Act');

      const institutionResponse = await request(app)
        .post(institutionRoute)
        .send(institution);

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { _id: institutionId } = institutionResponse.body;
      const { token: institutionToken } = responseInstitutionSession.body;
      const { token: adminToken } = responseAdminSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const { _id: actId } = actResponse.body;

      await request(app)
        .put(`${validateActRoute}/${institutionId}/approve/${actId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      const response = await request(app)
        .get(notificationRoute)
        .set('Authorization', `Bearer ${institutionToken}`);

      const { body } = response;

      expect(body.length).toBe(1);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('UPDATE', () => {
    test('Atualizar Notificação como lida', async () => {
      const institution = await factory.attrs('Institution');
      const admin = await factory.attrs('Admin');
      const act = await factory.attrs('Act');

      const institutionResponse = await request(app)
        .post(institutionRoute)
        .send(institution);

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { _id: institutionId } = institutionResponse.body;
      const { token: institutionToken } = responseInstitutionSession.body;
      const { token: adminToken } = responseAdminSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const { _id: actId } = actResponse.body;

      await request(app)
        .put(`${validateActRoute}/${institutionId}/approve/${actId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      const notificationResponse = await request(app)
        .get(notificationRoute)
        .set('Authorization', `Bearer ${institutionToken}`);

      const { body } = notificationResponse;

      const { _id: notificationId } = body[0];

      const response = await request(app)
        .put(`${notificationRoute}/${notificationId}`)
        .set('Authorization', `Bearer ${institutionToken}`);

      const { lida } = response.body;

      expect(lida).toBe(true);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('DELETE', () => {
    test('Deletar Notificação', async () => {
      const institution = await factory.attrs('Institution');
      const admin = await factory.attrs('Admin');
      const act = await factory.attrs('Act');

      const institutionResponse = await request(app)
        .post(institutionRoute)
        .send(institution);

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseInstitutionSession = await request(app)
        .post(institutionSessionRoute)
        .send({
          cnpj: institution.cnpj,
          senha: '123123'
        });

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { _id: institutionId } = institutionResponse.body;
      const { token: institutionToken } = responseInstitutionSession.body;
      const { token: adminToken } = responseAdminSession.body;

      const actResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(act);

      const { _id: actId } = actResponse.body;

      await request(app)
        .put(`${validateActRoute}/${institutionId}/approve/${actId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      const notificationResponse = await request(app)
        .get(notificationRoute)
        .set('Authorization', `Bearer ${institutionToken}`);

      const { body } = notificationResponse;

      const { _id: notificationId } = body[0];

      const response = await request(app)
        .delete(`${notificationRoute}/${notificationId}`)
        .set('Authorization', `Bearer ${institutionToken}`);

      expect(response.statusCode).toBe(204);
    });
  });
});
