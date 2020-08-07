const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const validateActRoute = '/validate-act';
const institutionRoute = '/institutions';
const adminRoute = '/admins';
const actRoute = '/acts';
const institutionSessionRoute = '/institution-sessions';
const adminSessionRoute = '/admin-sessions';

describe('Approve Act', () => {
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
    test('Aprovar um Ato', async () => {
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

      const response = await request(app)
        .put(`${validateActRoute}/${institutionId}/approve/${actId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      const { isApproved } = response.body;

      expect(response.statusCode).toBe(200);
      expect(isApproved).toBe(true);
    });

    test('Erro ao aprovar Ato com id não existente', async () => {
      const institution = await factory.attrs('Institution');
      const admin = await factory.attrs('Admin');

      const institutionResponse = await request(app)
        .post(institutionRoute)
        .send(institution);

      await request(app)
        .post(adminRoute)
        .send(admin);

      const responseAdminSession = await request(app)
        .post(adminSessionRoute)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { _id: institutionId } = institutionResponse.body;
      const { token: adminToken } = responseAdminSession.body;

      const response = await request(app)
        .put(
          `${validateActRoute}/${institutionId}/approve/5d979b4ed7730c0e1c7db1aa`
        )
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(400);
    });

    test('Erro ao aprovar Ato com id da instituição inexistente', async () => {
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

      const { token: adminToken } = responseAdminSession.body;

      const response = await request(app)
        .put(
          `${validateActRoute}/5d979b4ed7730c0e1c7db1aa/approve/5d979b4ed7730c0e1c7db1aa`
        )
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
