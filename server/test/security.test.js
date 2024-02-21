const request = require('supertest');
const app = require('../server.js');

describe('SecurityController', () => {
  describe('POST /register', () => {
    it('should create a new user and return 201 status', async () => {
      const newUser = {
        email: 'sfarnault@myges.com',
        password: 'Azerty1234!'
      };

      const response = await request(app)
        .post('/register')
        .send(newUser);
      
      expect(response.statusCode).toBe(201);
    });
  });

  describe('POST /login', () => {
    it('should login and return a token', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: 'sfarnault@myges.com', password: 'Azerty1234!' });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/logout');
      
      expect(response.statusCode).toBe(200);
    });
  });

  afterAll(async () => {
    app.close();
  });
});
