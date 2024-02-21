const request = require('supertest');
const app = require('../server.js');

describe('CardController', () => {
  let cardId;

  // Créer une carte
  it('should create a new card', async () => {
    const newCard = {
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      userId: 1
    };
    
    const response = await request(app)
      .post('/cards')
      .send(newCard);

    expect(response.statusCode).toBe(201);
    cardId = response.body.id;
  });

  it('should get all cards', async () => {
    const response = await request(app).get('/cards');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  afterAll(async () => {
    app.close();
  });
});
