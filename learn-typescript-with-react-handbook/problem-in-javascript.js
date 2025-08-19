let userName = "Alice";
userName = 42; // No error during assignment, but this might break the code later.

function greetUser(name) {
  console.log("Hello, " + name.toUpperCase()); // Error at runtime if `name` is not a string.
}

greetUser(userName); // Throws an error because `userName` is a number, not a string.
