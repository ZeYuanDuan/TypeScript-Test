import { DataBase } from '../../../app/server_app/data/DataBase';
import { UserCredentialsDataAccess } from '../../../app/server_app/data/UserCredentialsDataAccess';
import { Account } from '../../../app/server_app/model/AuthModel';

const insertMock = jest.fn();
const getByMock = jest.fn();

// 利用模擬模組的方式，模擬整個 Database 類別
jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe('UserCredentialsDataAccess test suite', () => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: '',
    password: 'somePassword',
    userName: 'someUserName',
  };

  const someId = 'abc';

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add user and return the id', async () => {
    insertMock.mockResolvedValueOnce(someId);

    const resultId = await sut.addUser(someAccount);

    expect(resultId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });

  it('should get user by id', async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const resultUser = await sut.getUserById(someId);

    expect(resultUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith('id', someId);
  });

  it('should get user by user name', async () => {
    getByMock.mockResolvedValueOnce(someAccount);

    const resultUser = await sut.getUserByUserName(someAccount.userName);

    expect(resultUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
  });
});
