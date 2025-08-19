let booleanArray: Array<boolean> = [true, false, true];

// Accessing array method
console.log(booleanArray.length);  // Output: 3

let numberArray: Array<number> = [1, 2, 3];

// Accessing array method
console.log(numberArray[0] * 2);  // Output: 2

let count = 42;  // TypeScript infers 'count' as a number
count = "Not a number";  // Error: Type 'string' is not assignable to type 'number'

let mixedArray = [1, "apple", true];  // TypeScript infers 'mixedArray' as (string | number | boolean)[]
console.log(mixedArray[0].toFixed(2));  // Error: Property 'toFixed' does not exist on type 'string | boolean'.
