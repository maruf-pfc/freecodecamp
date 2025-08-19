# TypeScript

## Type Annotations

```ts
let name: string = "Stephen";
console.log(name.toUpperCase());
```

- string: Represents text values.
- number: Represents numeric values (both integers and floating-point numbers).
- boolean: Represents a value that is either true or false.
- any: A fallback type that allows any value to be assigned to a variable, disabling type checking.
- void: Typically used for functions that do not return a value.
- null and undefined: Used to represent the absence of a value.

```ts
let numbers: number[] = [1, 2, 3]; // Type is explicitly set as an array of numbers
numbers.push(4); // This is fine, as 4 is a number

// Accessing array method
console.log(numbers.length); // Output: 4
```

```ts
let numbers: number[] = [1, 2, 3];
numbers = "Hello"; // Error: Type 'string' is not assignable to type 'number[]'

let numberArray: Array<number> = [1, 2, 3];

// Accessing array method
console.log(numberArray[0] * 2); // Output: 2
```

```ts
let booleanArray: Array<boolean> = [true, false, true];

// Accessing array method
console.log(booleanArray.length); // Output: 3
```

## Type Inference

```ts
let message = "Hello, TypeScript!"; // TypeScript infers 'message' as a string
console.log(message.toUpperCase()); // Output: HELLO, TYPESCRIPT!

let count = 42; // TypeScript infers 'count' as a number
console.log(count + 8); // Output: 50

let numbers = [1, 2, 3]; // TypeScript infers 'numbers' as an array of numbers (number[])
console.log(numbers.length); // Output: 3
```

```ts
let count = 42; // TypeScript infers 'count' as a number
count = "Not a number"; // Error: Type 'string' is not assignable to type 'number'

let mixedArray = [1, "apple", true]; // TypeScript infers 'mixedArray' as (string | number | boolean)[]
console.log(mixedArray[0].toFixed(2)); // Error: Property 'toFixed' does not exist on type 'string | boolean'.
```

## The Union Type

```ts
let value: string | number;

value = "Hello"; // ✅ Correct
console.log(value.toUpperCase()); // Output: HELLO

value = 42; // ✅ Correct
console.log(value + 8); // Output: 50

value = true; // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
```

```ts
function printId(id: string | number): void {
  console.log(`Your ID is: ${id}`);
}

printId(12345); // ✅ Correct
printId("abc123"); // ✅ Correct
printId(true); // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
```

### Custom Union Type

```ts
type ID = string | number;

function getUser(id: ID): void {
  console.log(`Fetching user with ID: ${id}`);
}

getUser(12345); // ✅ Correct
getUser("abc123"); // ✅ Correct
getUser(true); // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
```

## The Any Type

```ts
let mixedArray: any[] = [1, "apple", true];

console.log(mixedArray[0]); // Output: 1
console.log(mixedArray[1].toUpperCase()); // Output: APPLE
console.log(mixedArray[2]); // Output: true
```

## When to Use `Union` vs `any`

- Union Types: Use union types when the possible values are known or constrained to a few specific types. It provides type safety and avoids runtime errors.
- any Type: Use any as a last resort when the type is unknown or dynamic.

## Problems with `any`

```ts
function combineValues(value: any) {
  let anotherValue: number = 10;

  return value + anotherValue;
}

const result = combineValues(5); // No error here.
const anotherResult = result;

// Attempting to call a method on `anotherResult`
anotherResult.someUndefinedMethod(); // No compile-time error!
```

### What happened here?

- First, we didn’t have any type checking with any. The parameter value is of type any, meaning it can hold any value: a string, number, object, and so on. TypeScript skips enforcing type checks on value.
- Second, the return value assumes any. Since value is any, the return type of combineValues is also inferred as any.
- Third, there’s no error when calling an undefined method. After the function is called, anotherResult is also treated as any. TypeScript allows calling any method (even non-existent ones) on a variable of type any without throwing errors. In this case, someUndefinedMethod doesn’t exist, but TypeScript won’t warn you.

### The Risks of Using any

- Loss of type safety: You lose the benefits of TypeScript’s type system, like compile-time error checking. Potential runtime errors can go unnoticed during development.
- Accidental behavior: The function could accept unexpected inputs (e.g., strings, arrays, or objects), leading to incorrect results or crashes.
- Debugging complexity: Since the type is not enforced, debugging issues caused by incorrect types becomes more challenging.

### Solution: Use Explicit Types for Parameters and Return Values

```ts
function combineValues(value: number): number {
  let anotherValue: number = 10;

  return value + anotherValue;
}

const result = combineValues(5);
// result.someUndefinedMethod(); // Error: Property 'someUndefinedMethod' does not exist on type 'number'.
```

If you’re tempted to use any because the type isn’t clear, consider refactoring your code or using unknown combined with type guards for better safety.

## Using `unknown` as a Safer Alternative to `any` in TypeScript

```ts
function processValue(input: unknown): string {
  if (typeof input === "string") {
    return `The value is a string: ${input}`;
  } else if (typeof input === "number") {
    return `The value is a number: ${input}`;
  } else {
    return "The value is of an unknown type";
  }
}

console.log(processValue("Hello, TypeScript!")); // The value is a string: Hello, TypeScript!
console.log(processValue(42)); // The value is a number: 42
console.log(processValue(true)); // The value is of an unknown type
```

### Key Differences: `any` vs. `unknown`

| Feature         | any                       | unknown                           |
| --------------- | ------------------------- | --------------------------------- |
| Type checking   | No type checking          | Requires type checks before usage |
| Flexibility     | Can be used directly      | Must narrow the type first        |
| Common use case | Quick fixes (discouraged) | Safely handling uncertain types   |
