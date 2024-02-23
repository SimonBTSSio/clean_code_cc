const request = require('supertest');
const app = require('../server.js');
const Sequelize = require("sequelize");
const card = require('../controllers/card.js');

describe('CardController', () => {
  let cardId; 

  beforeAll(async () => {
    const newCard = {
      question: 'What is a test?',
      answer: 'a test is a test',
      userId: 1
    };

    const response = await request(app)
      .post('/cards')
      .send(newCard);

    expect(response.statusCode).toBe(201);
    cardId = response.body.id;
  });

  console.log(cardId);
  it('should create a new card', async () => {
    const newCard = {
      question: 'What is Muthu?',
      answer: 'Muthu is a professional developer.',
      userId: 1
    };
    
    const response = await request(app)
      .post('/cards')
      .send(newCard);

    expect(response.statusCode).toBe(201);
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
