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

  it("should return info for valid string", () => {
    // Arrange
    const sut = getStringInfo;
    const input = "Test-String";
    const expectedResult = {
      lowercase: "test-string",
      uppercase: "TEST-STRING",
      characters: ["T", "e", "s", "t", "-", "S", "t", "r", "i", "n", "g"],
      length: 11,
      extraInfo: {
        hasHyphen: true,
      },
    };

    // Act
    const result = sut(input);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
