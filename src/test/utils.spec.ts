import { StringUtils } from '../app/utils';

describe('utils test suite', () => {
  let sut: StringUtils;

  beforeEach(() => {
    sut = new StringUtils();
  });

  describe('toUpperCase', () => {
    it('should return uppercase', () => {
      // Arrange
      const input = 'test';
      const expectedResult = 'TEST';

      // Act
      const result = sut.toUpperCase(input);

      // Assert
      expect(result).toBe(expectedResult);
    });

    it('should throw error on invalid argument - function wrapper', () => {
      // Arrange
      function resultFn() {
        // Act
        sut.toUpperCase('');
      }

      // Assert
      expect(resultFn).toThrow('Invalid argument!');
    });

    it('should throw error on invalid argument - try catch block', (done) => {
      try {
        sut.toUpperCase('');
        // 呼叫 done，如果這行被執行，代表上一行並沒有拋出錯誤
        done('GetStringInfo should throw error for invalid arg!');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument!');
        // 指示 Jest 測試執行完畢，如果不使用，會造成 Timeout
        done();
      }
    });
  });
  describe('getStringInfo', () => {
    let result: any;

    beforeAll(() => {
      // Arrange
      const input = 'Test-String';

      // Act
      result = sut.getStringInfo(input);
    });

    it('return right length', () => {
      // Arrange
      const expected = 11;

      // Assert
      expect(result.length).toBe(expected);
    });

    it('return right lowercase', () => {
      // Arrange
      const expected = 'test-string';

      // Assert
      expect(result.lowercase).toBe(expected);
    });

    it('return right uppercase', () => {
      const expected = 'TEST-STRING';

      // Assert
      expect(result.uppercase).toBe(expected);
    });

    it('return right characters', () => {
      // Arrange
      const expected = ['T', 'e', 's', 't', '-', 'S', 't', 'r', 'i', 'n', 'g'];

      // Assert
      expect(result.characters).toEqual(expected);
    });

    it('should notice hyphen', () => {
      // Arrange
      const expected = true;

      // Assert
      expect(result.extraInfo.hasHyphen).toBe(expected);
    });
  });
});
