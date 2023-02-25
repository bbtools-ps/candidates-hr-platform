import { describe } from "vitest";
import { convertDate } from "./utils";

describe("convertDate()", () => {
  it("should convert the date from MM/DD/YYYY to YYYY-MM-DD", () => {
    const testDate = "03/12/1990";

    const result = convertDate(testDate);

    expect(result).toBe("1990-03-12");
  });
  it("should return undefined if the arguments that are passed are undefined", () => {
    const testDate = undefined;

    const result = convertDate(testDate);

    expect(result).toBeUndefined();
  });
  it("should throw an error if the arguments that are passed are not numeric strings", () => {
    const testDate = "AA";

    const resultFn = () => convertDate(testDate);

    expect(resultFn).toThrow();
  });
});
