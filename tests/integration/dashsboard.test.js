const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const adminRoute = '/admins';
const validateActRoute = '/validate-act';
const institutionRoute = '/institutions';
const actRoute = '/acts';
const institutionSessionRoute = '/institution-sessions';
const adminSessionRoute = '/admin-sessions';
const dashboardRoute = '/dashboard-admin';

describe('Dashboard Admin', () => {
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
    test('Retornar dashboard com informações válidas', async () => {
      const institution = await factory.attrs('Institution');
      const admin = await factory.attrs('Admin');
      const firstAct = await factory.attrs('Act');
      const secondAct = await factory.attrs('Act');

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

      const firstActResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(firstAct);

      const secondActResponse = await request(app)
        .post(actRoute)
        .set('Authorization', `Bearer ${institutionToken}`)
        .send(secondAct);

      const { _id: firstActId } = firstActResponse.body;
      const { _id: secondActId } = secondActResponse.body;

      await request(app)
        .put(`${validateActRoute}/${institutionId}/approve/${firstActId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      await request(app)
        .put(`${validateActRoute}/${institutionId}/disapprove/${secondActId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      const response = await request(app)
        .get(dashboardRoute)
        .set('Authorization', `Bearer ${adminToken}`);

      const { allActs, approvedActs, disapprovedActs } = response.body;

      expect(allActs).toBe(2);
      expect(approvedActs).toBe(1);
      expect(disapprovedActs).toBe(1);
      expect(response.statusCode).toBe(200);
    });
  });
});
