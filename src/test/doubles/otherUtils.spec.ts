import {
  calculateComplexity,
  toUpperCaseWithCB,
} from '../../app/doubles/otherUtils';

describe('otherUtils test suite', () => {
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
