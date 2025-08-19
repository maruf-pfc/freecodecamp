function processValue(input: unknown): string {
  if (typeof input === 'string') {
    return `The value is a string: ${input}`;
  } else if (typeof input === 'number') {
    return `The value is a number: ${input}`;
  } else {
    return 'The value is of an unknown type';
  }
}

console.log(processValue('Hello, TypeScript!')); // The value is a string: Hello, TypeScript!
console.log(processValue(42)); // The value is a number: 42
console.log(processValue(true)); // The value is of an unknown type
