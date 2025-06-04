import { getRequestBody } from '../../../app/server_app/utils/Utils';
import { IncomingMessage } from 'http';

describe('getRequestBody Test Suite', () => {
  const requestMock = {
    on: jest.fn(),
  };

  const testData = {
    name: 'anonymous',
    age: 33,
    city: 'London',
  };

  const testDataAsString = JSON.stringify(testData);

  it('should return object for valid JSON', async () => {
    requestMock.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        callback(testDataAsString);
      } else {
        callback();
      }
    });

    const result = await getRequestBody(requestMock as any as IncomingMessage);

    expect(result).toEqual(testData);
  });

  it('should throw error for invalid JSON', async () => {
    requestMock.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        callback('making JSON Invalid' + testDataAsString);
      } else {
        callback();
      }
    });

    // 測試非同步拋錯，最為直白的方法
    await expect(getRequestBody(requestMock as any)).rejects.toThrow(
      'Unexpected token \'m\', "making JSO"... is not valid JSON',
    );
  });

  it('should throw for unexpected error', async () => {
    const error = new Error('Something went wrong!');

    requestMock.on.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(error);
      }
    });

    await expect(getRequestBody(requestMock as any)).rejects.toThrow(
      error.message,
    );
  });
});
