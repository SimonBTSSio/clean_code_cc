const UserService = require('../services/user');
const { User } = require('../db');
jest.mock('../db');

describe('UserService', () => {
  it('findAll should return all users', async () => {
    User.findAll.mockResolvedValue([{ id: 1, email: 'test@example.com' }]);
    const userService = UserService();
    const options = { order: null, limit: null, offset: null };
    const users = await userService.findAll({}, options);
    expect(users).toEqual([{ id: 1, email: 'test@example.com' }]);
  });

  it('findOne should return a single user', async () => {
    const userMock = { id: 1, email: 'test@example.com' };
    User.findOne.mockResolvedValue(userMock);
    const userService = UserService();
    const user = await userService.findOne({ id: 1 });
    expect(user).toEqual(userMock);
  });

  it('create should add a new user', async () => {
    const newUser = { email: 'new@example.com', password: 'password123' };
    User.create.mockResolvedValue(newUser);
    const userService = UserService();
    const createdUser = await userService.create(newUser);
    expect(createdUser).toEqual(newUser);
  });

  it('update should update a user', async () => {
    const updatedUserData = { email: 'updated@example.com' };
    User.update.mockResolvedValue([1, [updatedUserData]]);
    const userService = UserService();
    const updatedUsers = await userService.update({ id: 1 }, updatedUserData);
    expect(updatedUsers).toEqual([updatedUserData]);
  });

  it('delete should remove a user', async () => {
    User.destroy.mockResolvedValue(1);
    const userService = UserService();
    const result = await userService.delete({ id: 1 });
    expect(result).toBe(1);
  });

  it('login should authenticate a user', async () => {
    const userMock = {
      email: 'test@example.com',
      isPasswordValid: jest.fn().mockResolvedValue(true)
    };
    User.findOne.mockResolvedValue(userMock);
    const userService = UserService();
    const user = await userService.login('test@example.com', 'password123');
    expect(user).toEqual(userMock);
  });
});
