

/*

- function first-class citizen in JavaScript
-> function itself is an object
    - can be assigned to a variable
    - can be passed as an argument to another function
    - can be returned by another function

how to create a function in JavaScript
- function declaration
- function expression
- arrow function (ES6)    

*/


// 1. function declaration
// Named function
// Always hoisted to the top of the scope with function object
// function created in scope-creation phase, before code execution

console.log(add(2, 3)); // Output: 5

function add(x, y) {
    return x + y;
}

console.log(add(2, 3)); // Output: 5

// 2. function expression
// Anonymous function assigned to a variable
// Not hoisted, only the variable declaration is hoisted (undefined)
// function created in code execution phase, when the assignment is executed


// console.log(subtract(5, 2)); // Output: TypeError: subtract is not a function

let subtract = function (x, y) {
    return x - y;
};

console.log(subtract(5, 2)); // Output: 3


// 3. arrow function (ES6)
// Anonymous function with a shorter syntax
// Not hoisted, only the variable declaration is hoisted (undefined)
// function created in code execution phase, when the assignment is executed

const multiply = function (x, y) {
    return x * y;
}
// or
const multiplyArrow = (x, y) => x * y;


//-----------------------------------------------
// function parameters and arguments
//-----------------------------------------------
// - parameters: variables listed in the function definition
// - arguments: actual values passed to the function when it is called
//-----------------------------------------------

function f(a, b) {
    console.log(a)
    console.log(b)
    console.log(arguments) // arguments object is an array-like object that contains all the arguments passed to the function
}

f(1, 2, 3, 4)


function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sum()); // Output: 0
console.log(sum(1, 2, 3)); // Output: 6
console.log(sum(1, 2, 3, 4)); // Output: 10

// can we overload functions in JavaScript by params ? No, the last function declaration will overwrite the previous ones

function getLunch() {
    return "No Lunch";
}
function getLunch(pay) {
    if (arguments.length === 0) {
        return "No Lunch";
    } else if (arguments.length === 1) {
        return "Lunch";
    }
}

console.log(getLunch())


// function  with default parameters (ES6)
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(greet()); // Output: Hello, Guest!
console.log(greet("Alice")); // Output: Hello, Alice!   


// function with rest parameters (ES6)
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3)); // Output: 6
console.log(sumAll(1, 2, 3, 4)); // Output: 10


//----------------------------------------------
// function is first-class citizen in JavaScript
//----------------------------------------------
// - can be assigned to a variable
// - can be passed as an argument to another function
// - can be returned by another function

//----------------------------------------------

function greet() {
    console.log("Hello!");
}

let sayHello = greet; // assign function to a variable
sayHello(); // Output: Hello!


// function as an argument

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/*

    style of programming

    style-1: imperative programming
    
    => solving any problem using step-by-step instructions
    => intention & implementation mixed together

    style-2: declarative programming
    
    => solving any problem by describing the desired outcome
    => intention & implementation separated

*/

// author: You

// Req-1: filter out odd numbers from the array
let oddNumbers = filterNumbers(numbers, num => num % 2 !== 0);

// Req-2: filter out even numbers from the array
let evenNumbers = filterNumbers(numbers, num => num % 2 === 0);


// author: Me

function filterOddNumbers(input) {
    let output = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] % 2 !== 0) {
            output.push(input[i]);
        }
    }
    return output;
}
function filterEvenNumbers(input) {
    let output = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] % 2 === 0) {
            output.push(input[i]);
        }
    }
    return output;
}
function filterNumbers(input, filterFunction) {
    let output = [];
    for (let i = 0; i < input.length; i++) {
        if (filterFunction(input[i])) {
            output.push(input[i]);
        }
    }
    return output;
}


// // - can be returned by another function

function teach() {
    console.log("Teaching JavaScript...");
    const learn = function () {
        console.log("Learning JavaScript...");
    }
    return learn;
}

let learnFunction = teach(); // Output: Teaching JavaScript...
learnFunction(); // Output: Learning JavaScript...
learnFunction(); // Output: Learning JavaScript...


//-----------------------------------------------
// design issues
//-----------------------------------------------

// -> code tangling: when the code is not organized properly, it becomes difficult to understand and maintain
// -> code scattering: when the code is scattered across different parts of the codebase, it becomes difficult to understand and maintain


function hello() {
    console.log("Hello")
}
function hi() {
    console.log("Hi")
}
function hey() {
    console.log("Hey")
}

// HOF -> higher-order function: a function that takes another function as an argument or returns a function as a result
function with_Emoji(func, emoji = "😊") {
    return function () {
        func();
        console.log(emoji);
    }
}

hello(); // Output: Hello
with_Emoji(hello)(); // Output: Hello 😊



//--------------------------------------------------------
// function closure
//--------------------------------------------------------

function teach() {
    console.log("Teaching JavaScript...");
    let notes = "JavaScript is a versatile language.";
    function learn() {
        console.log("Learning JavaScript...");
        console.log(notes);
        console.log("Learning JavaScript Ends");
    }
    console.log("Teaching JavaScript Ends");
    return learn;
}

let learFunc = teach();
learFunc();
learFunc();