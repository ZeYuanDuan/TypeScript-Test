import { toUpperCase } from "../app/utils";

describe("utils test suite", () => {
  it("should return uppercase", () => {
    const input = "test";
    const expectedResult = "TEST";

    const result = toUpperCase(input);

    expect(result).toBe(expectedResult);
  });
});
