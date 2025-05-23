import { toUpperCase } from "../app/utils";

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
