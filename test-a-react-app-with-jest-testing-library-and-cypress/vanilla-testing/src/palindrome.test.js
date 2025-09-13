const isPalindrome = require("./palindrome.js");

describe("isPalindrome function", () => {
  test("neuquen is palindrom", () => {
    expect(isPalindrome("neuquen")).toBe(true);
  });

  test("bariloche is not palindrom", () => {
    expect(isPalindrome("bariloche")).toBe(false);
  });
});
