import { getStringInfo, toUpperCase } from "../app/utils";

describe("utils test suite", () => {
  it("should return uppercase", () => {
    // Arrange
    const sut = toUpperCase; // 指定要測試的函式
    const input = "test";
    const expectedResult = "TEST";

    // Act
    const result = sut(input);

    // Assert
    expect(result).toBe(expectedResult);
  });
});

describe("getStringInfo", () => {
  let result: any;

  beforeAll(() => {
    // Arrange
    const sut = getStringInfo;
    const input = "Test-String";

    // Act
    result = sut(input);
  });

  it("return right length", () => {
    // Arrange
    const expected = 11;

    // Assert
    expect(result.length).toBe(expected);
  });

  it("return right lowercase", () => {
    // Arrange
    const expected = "test-string";

    // Assert
    expect(result.lowercase).toBe(expected);
  });

  it("return right uppercase", () => {
    const expected = "TEST-STRING";

    // Assert
    expect(result.uppercase).toBe(expected);
  });

  it("return right characters", () => {
    // Arrange
    const expected = ["T", "e", "s", "t", "-", "S", "t", "r", "i", "n", "g"];

    // Assert
    expect(result.characters).toEqual(expected);
  });

  it("should notice hyphen", () => {
    // Arrange
    const expected = true;

    // Assert
    expect(result.extraInfo.hasHyphen).toBe(expected);
  });
});
