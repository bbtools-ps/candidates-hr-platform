import { convertToKebabCase } from ".";

describe("convertToKebabCase", () => {
  it("should convert a string to kebab case", () => {
    const input = "This is a Test String";
    const result = convertToKebabCase(input);
    expect(result).toBe("this-is-a-test-string");
  });

  it("should handle empty string", () => {
    const result = convertToKebabCase("");
    expect(result).toBeUndefined();
  });

  it("should handle undefined input", () => {
    const result = convertToKebabCase();
    expect(result).toBeUndefined();
  });

  it("should handle string with leading and trailing spaces", () => {
    const input = "   Some String   ";
    const result = convertToKebabCase(input);
    expect(result).toBe("some-string");
  });

  it("should handle string with multiple spaces between words", () => {
    const input = "   Multiple    Spaces    Between    Words   ";
    const result = convertToKebabCase(input);
    expect(result).toBe("multiple-spaces-between-words");
  });

  it("should convert a string with special characters to kebab case", () => {
    const input = "Special#@Characters!String";
    const result = convertToKebabCase(input);
    expect(result).toBe("special-characters-string");
  });

  it("should handle string with consecutive spaces and hyphens", () => {
    const input = "   Multiple   -   Spaces    Between  - - Words   ";
    const result = convertToKebabCase(input);
    expect(result).toBe("multiple-spaces-between-words");
  });

  it("should handle string with only spaces and hyphens", () => {
    const input = "    -    -    -    ";
    const result = convertToKebabCase(input);
    expect(result).toBeUndefined();
  });

  it("should handle string with leading and trailing spaces and hyphens", () => {
    const input = "   -   Some String   -   ";
    const result = convertToKebabCase(input);
    expect(result).toBe("some-string");
  });

  it("should handle string with mixed case", () => {
    const input = "MiXeD CaSe StRiNg";
    const result = convertToKebabCase(input);
    expect(result).toBe("mixed-case-string");
  });

  it("should handle string with non-breaking spaces", () => {
    const input = "NonBreaking Spaces";
    const result = convertToKebabCase(input);
    expect(result).toBe("nonbreaking-spaces");
  });
});
