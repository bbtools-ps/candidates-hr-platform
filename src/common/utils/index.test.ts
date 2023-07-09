import { describe, it, vi } from "vitest";
import { convertDate, getCurrentYear } from "./date";
import {
  validateDate,
  validateEmail,
  validateEmptyValue,
  validatePhoneNumber,
} from "./validators";

describe("getCurrentYear()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should return the current year", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);

    const result = getCurrentYear();

    expect(result).toBe(2022);
  });
});

describe("validateEmptyValue()", () => {
  it("should return false if empty string value is passed", () => {
    const testValue = "";

    const result = validateEmptyValue(testValue);

    expect(result).toBe(false);
  });
  it("should be return true if non-empty string value is passed", () => {
    const testValue = "test";

    const result = validateEmptyValue(testValue);

    expect(result).toBe(true);
  });
});

describe("validateEmail()", () => {
  it("should return true if valid e-mail is passed", () => {
    const testValue = "test@test.com";

    const result = validateEmail(testValue);

    expect(result).toBe(true);
  });
  it("should return false if invalid e-mail is passed", () => {
    const testValue1 = "test";
    const testValue2 = "test@";
    const testValue3 = "test@test.";

    const result1 = validateEmail(testValue1);
    const result2 = validateEmail(testValue2);
    const result3 = validateEmail(testValue3);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });
});

describe("validatePhoneNumber()", () => {
  it("should return true if valid phone number is passed", () => {
    const testValue1 = "+38164321321";
    const testValue2 = "064321321";

    const result1 = validatePhoneNumber(testValue1);
    const result2 = validatePhoneNumber(testValue2);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
  it("should return false if invalid phone number is passed", () => {
    const testValue1 = "+aa";
    const testValue2 = "aa";

    const result1 = validatePhoneNumber(testValue1);
    const result2 = validatePhoneNumber(testValue2);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});

describe("validateDate()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("should return true if valid date is passed", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);
    const testValue1 = new Date(2000, 0, 1).toUTCString();
    const testValue2 = "2000-01-01";

    const result1 = validateDate(testValue1);
    const result2 = validateDate(testValue2);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
  it("should return false if invalid date is passed", () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);
    const testValue1 = "";
    const testValue2 = "2030-01-01";

    const result1 = validateDate(testValue1);
    const result2 = validateDate(testValue2);

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});

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
