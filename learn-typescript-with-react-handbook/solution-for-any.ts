function combineValues(value: number): number {
  let anotherValue: number = 10;

  return value + anotherValue;
}

const result = combineValues(5);
// result.someUndefinedMethod(); // Error: Property 'someUndefinedMethod' does not exist on type 'number'.
