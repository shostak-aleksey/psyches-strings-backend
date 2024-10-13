// const chai = require('chai');
// const app = require('../app'); // Предполагается, что ваш Express-приложение экспортируется из app.js
// const { expect } = chai;

// describe('UserController', () => {
//   describe('POST /api/register', () => {
//     it('should register a new user', (done) => {
//       chai
//         .request(app)
//         .post('/api/register')
//         .send({
//           email: 'test@example.com',
//           password: 'password123',
//           role: 'user',
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('accessToken');
//           expect(res.body).to.have.property('refreshToken');
//           done();
//         });
//     });
//   });

//   describe('POST /api/login', () => {
//     it('should login an existing user', (done) => {
//       chai
//         .request(app)
//         .post('/api/login')
//         .send({ email: 'test@example.com', password: 'password123' })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('accessToken');
//           done();
//         });
//     });
//   });

//   // Добавьте тесты для других эндпоинтов аналогично
// });
