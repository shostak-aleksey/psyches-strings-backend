const request = require('supertest');
const { app } = require('../../src/index');
const chai = require('chai');
const { expect } = chai;
const passport = require('passport');

// Mock passport.authenticate for testing
passport.authenticate = jest.fn(
  (strategy, options, callback) => (req, res, next) => {
    req.user = { id: 1, email: 'admin@example.com', role: 'ADMIN' }; // Mock admin user
    return callback(null, req.user);
  },
);

describe('UserController Endpoints', () => {
  let accessToken;
  let refreshToken;

  describe('GET /auth/google', () => {
    it('should redirect to Google for authentication', async () => {
      const res = await request(app).get('/auth/google');
      expect(res.status).to.equal(302); // Expect a redirect
      expect(res.headers.location).to.contain('accounts.google.com'); // Ensure redirect to Google
    });
  });

  describe('GET /auth/google/callback', () => {
    it('should authenticate user and return tokens', async () => {
      const res = await request(app).get('/auth/google/callback');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('accessToken');
      expect(res.body).to.have.property('refreshToken');
      accessToken = res.body.accessToken;
      refreshToken = res.body.refreshToken;
    });
  });

  describe('POST /api/user/login', () => {
    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({ email: 'admin@example.com', password: 'password123' });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('accessToken');
      accessToken = res.body.accessToken;
    });
  });

  describe('POST /api/user/refresh', () => {
    it('should refresh tokens', async () => {
      const res = await request(app)
        .post('/api/user/refresh')
        .set('Cookie', `refreshToken=${refreshToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('accessToken');
    });
  });

  describe('POST /api/user/logout', () => {
    it('should logout the user', async () => {
      const res = await request(app)
        .post('/api/user/logout')
        .set('Cookie', `refreshToken=${refreshToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Вы успешно вышли из системы');
    });
  });

  describe('GET /api/user', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('GET /api/user/:id', () => {
    it('should get a single user by id', async () => {
      const res = await request(app)
        .get('/api/user/1') // Replace with a valid user ID
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('email');
    });
  });

  describe('PUT /api/user/:id', () => {
    it('should update a user', async () => {
      const res = await request(app)
        .put('/api/user/1') // Replace with a valid user ID
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ email: 'updated@example.com', role: 'ADMIN' });

      expect(res.status).to.equal(200);
      expect(res.body.email).to.equal('updated@example.com');
    });
  });

  describe('DELETE /api/user/:id', () => {
    it('should delete a user', async () => {
      const res = await request(app)
        .delete('/api/user/1') // Replace with a valid user ID
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Пользователь удален');
    });
  });
});
