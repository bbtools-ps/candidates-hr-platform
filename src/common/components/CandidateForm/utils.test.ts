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
  it("should throw an error if the arguments that are passed are not in appropriate string format MM/DD/YYYY", () => {
    const testDate1 = "AA";
    const testDate2 = "12312/3123/123";
    const testDate3 = "12/12/12";

    const resultFn1 = () => convertDate(testDate1);
    const resultFn2 = () => convertDate(testDate2);
    // @ts-ignore
    const resultFn3 = () => convertDate(testDate3);

    expect(resultFn1).toThrow();
    expect(resultFn2).toThrow();
    expect(resultFn3).toThrow();
  });
});
