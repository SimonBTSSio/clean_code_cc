const CardService = require('../services/card');
const { Card } = require('../db');
jest.mock('../db');

describe('CardService', () => {
  it('findOne should return a specific card based on filters', async () => {
    const cardService = CardService();
    Card.findOne.mockResolvedValue({ id: 1, name: 'Test Card' });
    const card = await cardService.findOne({ id: 1 });
    expect(card).toEqual({ id: 1, name: 'Test Card' });
  });

  it('create should create and return a new card', async () => {
    const cardService = CardService();
    Card.create.mockResolvedValue({ id: 1, name: 'New Card' });
    const card = await cardService.create({ name: 'New Card' });
    expect(card).toEqual({ id: 1, name: 'New Card' });
  });

  it('getNextCategory should return the next category', () => {
    const cardService = CardService();
    const nextCategory = cardService.getNextCategory('THIRD');
    expect(nextCategory).toBe('FOURTH');
  });

  it('getNextCategory should return undefined for last category', () => {
    const cardService = CardService();
    const nextCategory = cardService.getNextCategory('SEVENTH');
    expect(nextCategory).toBeUndefined();
  });

});
