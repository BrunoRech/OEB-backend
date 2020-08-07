const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const factory = require('../../src/util/factories');

const adminRoute = '/admins';
const session = '/admin-sessions';
const validateActRoute = '/validate-act';

describe('Validate Act', () => {
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
    test('Retornar todos os atos', async () => {
      const admin = await factory.attrs('Admin');

      await request(app)
        .post(adminRoute)
        .send(admin);

      const adminResponseSession = await request(app)
        .post(session)
        .send({
          cpf: admin.cpf,
          senha: '123123'
        });

      const { token } = adminResponseSession.body;

      const response = await request(app)
        .get(validateActRoute)
        .set('Authorization', `Bearer ${token}`);

      // ver isso aqui
      expect(response.statusCode).toBe(400);
    });
  });
});
