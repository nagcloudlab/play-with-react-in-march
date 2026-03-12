

/**
 *
 * execution-context
 * -----------------
 *
 * => stack-frame which contains given args and local variables
 * => each function call creates a new execution context
 * => every nested function call creates a new execution context which is a child of the parent execution context
 *
 *
 * context has 2 phases:
 *
 * 1. creation phase
 *  => any variable declared inside a function with 'var' keyword
 * always get hoisted to the top of the function and initialized with 'undefined'
 *
 * 2. execution phase
 * => code is executed line by line and variables are assigned with their actual values
 *
 */


// // Quiz
// var v = 10
// function foo() {
//     function bar() {
//         console.log(v)
//     }
//     bar() // bar-context <- foo-context <- global-context
//     var v = 20
// }
// foo()// foo-context <- global-context



// var v = 12;
// var v = 13;
// console.log(v) 


var v = 10
if (true) {
    var v = 20 // not block scoped, it will override the global variable v
}
console.log(v)

// problems with 'var' keyword
// 1. 'var' is function scoped, not block scoped
// 2. 'var' declarations are hoisted to the top of their scope and initialized with 'undefined', which can lead to unexpected behavior
// 3. 'var' allows redeclaration of variables, which can lead to bugs and confusion in larger codebases



// solution: use 'let' and 'const' keywords which are block scoped and do not allow redeclaration of variables, and are not hoisted to the top of their scope.

// console.log(x) // ReferenceError: Cannot access 'x' before initialization
// let x = 10

// let x = 10
// let x = 20 // SyntaxError: Identifier 'x' has already been declared


// let v = 10
// if (true) {
//     let v = 20 // block scoped, it will not override the global variable v
// }
// console.log(v) // 10

const lunch = {
    name: 'Pizza',
    price: 10,
    calories: 500
}

lunch.price = 12 // we can change the properties of an object declared with 'const', but we cannot reassign the variable itself
console.log(lunch)


// Summary:

// use 'let for mutable references and 'const' for immutable references
// avoid using 'var' keyword to prevent issues with hoisting and redeclaration of variables