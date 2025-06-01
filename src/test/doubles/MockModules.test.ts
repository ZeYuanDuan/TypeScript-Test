// 取代原本的模組，回傳一個新物件
// 除了 calculateComplexity，其餘函式就仍照原本模組當中的實作
jest.mock('../../app/doubles/otherUtils', () => ({
  ...jest.requireActual('../../app/doubles/otherUtils'),
  calculateComplexity: () => {
    return 10;
  },
}));

// mock v4 的實作，使其不會產生亂數，而是字串 '123'
jest.mock('uuid', () => ({
  v4: () => '123',
}));

import * as OtherUtils from '../../app/doubles/otherUtils';

describe('module test', () => {
  it('calculate complexity', () => {
    const result = OtherUtils.calculateComplexity({} as any);
    console.log(result); // 由於我們定義的 mock 實作，回傳 10
  });

  it('keep other functions', () => {
    const result = OtherUtils.toUpperCase('abc');
    expect(result).toBe('ABC'); // 仍是原本方法，因此測試會通過
  });

  it('string with id', () => {
    const result = OtherUtils.toLowerCaseWithId('ABC');
    expect(result).toBe('abc123'); // 由於我們已經定義 v4 會回傳 123，因此測試會通過
  });
});
