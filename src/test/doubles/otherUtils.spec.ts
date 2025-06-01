import {
  calculateComplexity,
  otherStringUtils,
  toUpperCaseWithCB,
} from '../../app/doubles/otherUtils';

describe('otherUtils test suite', () => {
  describe('OtherStringUtils tests with spies', () => {
    let sut: otherStringUtils;

    beforeEach(() => {
      sut = new otherStringUtils();
    });

    it('use a spy to track calls', () => {
      // 追蹤 sut 物件當中的 toUpperCase 方法
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('abc');
      expect(toUpperCaseSpy).toHaveBeenCalledTimes(1);
    });

    it('use a spy to tracks calls to other module', () => {
      // 追蹤 console 物件的 log 方法
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });

    it('use a spy to replace the implementation of a method', () => {
      // 照理來說，私有方法無法被 Spy 模擬，但因為我們將 sut 宣稱為 any，
      // TypeScript 如今無法確認該方法是否為私有，因此不會報錯。
      // 不過這不是一個推薦做法，只是應急措施。
      // 我們在此利用 mock 改變方法的實作
      jest.spyOn(sut as any, 'callExternalService').mockImplementation(() => {
        console.log('calling mocked implementation');
      });
      (sut as any).callExternalService(); // 順利印出被替換的訊息
    });
  });

  it('Calculate complexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someOtherInfo',
      },
    };
    // 利用 any 斷言，忽略缺少的屬性，這就是 Stubs
    const result = calculateComplexity(someInfo as any);
    expect(result).toBe(10);
  });

  describe('Tracking callbacks with Jest Mocks', () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Track calls - calls callback for invalid argument', () => {
      // 使用 Mock，追蹤後續被代入當中的參數，以及被呼叫次數
      const result = toUpperCaseWithCB('', callBackMock);

      expect(result).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith('Invalid argument!');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it('Track calls - calls callback for valid argument', () => {
      const argument = 'valid';
      const result = toUpperCaseWithCB(argument, callBackMock);

      expect(result).toBe(argument.toUpperCase());
      expect(callBackMock).toHaveBeenCalledWith(
        `called function with ${argument}`
      );
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tracking callbacks', () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    // 每次測試都清空 Mock 的內部狀態
    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it('Track calls - calls callback for invalid argument', () => {
      // 使用 Mock，追蹤後續被代入當中的參數，以及被呼叫次數
      const result = toUpperCaseWithCB('', callBackMock);

      expect(result).toBeUndefined();
      expect(cbArgs).toContain('Invalid argument!');
      expect(timesCalled).toBe(1);
    });

    it('Track calls - calls callback for valid argument', () => {
      const argument = 'valid';
      const result = toUpperCaseWithCB(argument, callBackMock);

      expect(result).toBe(argument.toUpperCase());
      expect(cbArgs).toContain(`called function with ${argument}`);
      expect(timesCalled).toBe(1);
    });
  });

  it('ToUpperCase - calls callback for invalid argument', () => {
    // 原本的回調函式，可能會在背景執行很複雜的操作，但我們在此完全忽略，這就是 Fakes
    const result = toUpperCaseWithCB('', () => {});

    expect(result).toBeUndefined();
  });

  it('ToUpperCase - calls callback for valid argument', () => {
    const result = toUpperCaseWithCB('abc', () => {});

    expect(result).toBe('ABC');
  });
});
