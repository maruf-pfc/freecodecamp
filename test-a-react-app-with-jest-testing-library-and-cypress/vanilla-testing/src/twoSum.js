function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const neededNum = target - nums[i];
    if (nums.indexOf(neededNum) !== -1 && nums.indexOf(neededNum) !== i)
      return [nums[i], nums[nums.indexOf(neededNum)]];
  }
  return false;
}

module.exports = twoSum;
