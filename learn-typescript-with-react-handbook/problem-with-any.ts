function combineValues(value: any) {
  let anotherValue: number = 10;

  return value + anotherValue;
}

const result = combineValues(5); // No error here.
const anotherResult = result;

// Attempting to call a method on `anotherResult`
anotherResult.someUndefinedMethod(); // No compile-time error!
