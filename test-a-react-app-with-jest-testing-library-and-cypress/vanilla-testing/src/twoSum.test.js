const twoSum = require("./twoSum.js");

describe("twoSum function", () => {
  test("[2,7,11,15] and 9 returns [2, 7]", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([2, 7]);
  });

  test("[3,2,4] and 6 returns [2, 4]", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([2, 4]);
  });

  test("[3,2,4] and 10 returns false", () => {
    expect(twoSum([3, 2, 4], 10)).toBe(false);
  });
});
