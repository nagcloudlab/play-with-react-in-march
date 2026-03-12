"use strict";

/*
    javascrpt has 2 types of data types

    1. Primitive data types -> values that are immutable (cannot be changed) and are stored directly in the variable. Examples include:
        - string
        - number
        - boolean
        - null
        - undefined
        - symbol
    2. Non-primitive data types -> values that are mutable (can be changed) and are stored as references. Examples include:
        - object
        - array
        - function
*/

// Primitive data types

// 1. string

// we can make a string using single quotes, double quotes, or backticks

var name1 = 'John'; // using single quotes
var name2 = "John"; // using double quotes
var name3 = `John`; // using backticks
console.log(typeof name1); // string
console.log(typeof name2); // string
console.log(typeof name3); // string

// when to use single quotes, double quotes, or backticks?
// - use single quotes or double quotes for simple strings that do not require interpolation or multi-line formatting
// - use backticks for strings that require interpolation or multi-line formatting

var myName = 'John';
var age = 30;
var message1 = 'My name is ' + myName + ' and I am ' + age + ' years old.';
var message2 = `My name is ${myName} and I am ${age} years old.`;
console.log(message1); // My name is John and I am 30 years old.
console.log(message2); // My name is John and I am 30 years old.

var htmlTemplate = `<div>
    <h1>${myName}</h1>
    <p>Age: ${age}</p>
</div>`;
console.log(htmlTemplate);


// 2. number

var age = 30;
var price = 19.99;
console.log(typeof age); // number
console.log(typeof price); // number

// 3. boolean

var isStudent = true;
var isEmployed = false;
console.log(typeof isStudent); // boolean
console.log(typeof isEmployed); // boolean

/*

// important note:
    in javascript, we have 6 falsy values:

    1. false
    2. 0
    3. '' (empty string)
    4. null
    5. undefined
    6. NaN (Not a Number)

    all other values are truthy

    Ref: https://dorey.github.io/JavaScript-Equality-Table/
*/


// 4. null

var emptyValue = null;
console.log(typeof emptyValue); // object (this is a known quirk in javascript, null is actually a primitive data type)

// 5. undefined

var notDefined;
console.log(typeof notDefined); // undefined


//--------------------------------------------------------------
// Non-primitive data types. => object(s)
//---------------------------------------------------------------

// data  -> state
// function -> behavior
// address | reference -> identity

// object => sbi

// how to create an object in javascript?

// before ES6, ( dont have class syntax) , we use constructor functions to create objects
// what is a constructor function? any Function with 'pascal case' naming convention (first letter is capitalized) is considered a constructor function

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.sayName = function () {
//     console.log(`My name is ${this.name}`);
// };
// Person.prototype.sayAge = function () {
//     console.log(`I am ${this.age} years old`);
// };

// after ES6, we can use class syntax to create objects

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(`My name is ${this.name}`);
    }
    sayAge() {
        console.log(`I am ${this.age} years old`);
    }
}

console.log(typeof Person); // function (classes in javascript are actually special functions)

var person1 = new Person('John', 30);
var person2 = new Person('Jane', 25);
console.log(person1); // Person { name: 'John', age: 30 }
console.log(person2); // Person { name: 'Jane', age: 25 }

/*

important note about objects in javascript:

-> by default an object is extensible, which means we can add new properties to it even after it has been created.
-> by default an object is configurable, which means we can delete properties from it even after it has been created.
-> by default an object is mutable, which means we can change the values of its properties even after it has been created.

*/

//Object.preventExtensions(person1); // prevent adding new properties to person1
//Object.seal(person1); // prevent adding new properties and deleting existing properties from person1
// Object.freeze(person1); // prevent adding new properties, deleting existing properties, and changing the values of existing properties in person1

// console.log(Object.isExtensible(person1)); // false
// console.log(Object.isSealed(person1)); // true
// console.log(Object.isFrozen(person1)); // true

// person1.address = '123 Main St';
// console.log(person1); // Person { name: 'John', age: 30, address: '123 Main St' }
// console.log(person2); // Person { name: 'Jane', age: 25 }

// delete person1.age;
// console.log(person1); // Person { name: 'John', age: 30 }
// console.log(person2); // Person { name: 'Jane', age: 25 }

// person1.name = 'John Doe';
// console.log(person1); // Person { name: 'John', age: 30 }
// console.log(person2); // Person { name: 'Jane', age: 25 }



//--------------------------------------------------------------
// javasctript built-in object types
//----------------------------------------------------------------

// 1. Object
// 2. Array
// 3. Function
// 4. RegExp
//... and many more

var person = new Object();
person.name = 'John';
person.age = 30;
person.sayName = function () {
    console.log(`My name is ${this.name}`);
};
person.sayAge = function () {
    console.log(`I am ${this.age} years old`);
};


// or literally
person = {
    name: 'John',
    age: 30,
    sayName: function () {
        console.log(`My name is ${this.name}`);
    },
    sayAge: function () {
        console.log(`I am ${this.age} years old`);
    }
};

console.log(person); // { name: 'John', age: 30 }


// Array

var numbers = new Array(1, 2, 3, 4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]

// or literally

numbers = [1, 2, 3, 4, 5];
console.log(numbers); // [1, 2, 3, 4, 5]

// Function

var add = new Function('a', 'b', 'return a + b');
console.log(add(2, 3)); // 5

// or literally

add = function (a, b) {
    return a + b;
};
console.log(add(2, 3)); // 5

// RegExp

var aadharRegex = new RegExp('\\d{4}-\\d{4}-\\d{4}$');
var aadharInput = '1234-5678-9012';
console.log(aadharRegex.test(aadharInput)); // true

// or literally

aadharRegex = /\d{4}-\d{4}-\d{4}$/;
console.log(aadharRegex.test(aadharInput)); // true

// for Object, Array, Function, RegExp, and many more built-in object types in javascript, 
// we can use both the constructor syntax and the literal syntax to create instances of these types.
// recommended to use literal syntax for better readability and performance, as it is more concise and optimized by the javascript engine.


// Naming convention for object's properties and methods:

// - use camelCase for properties and methods (e.g. name, age, sayName, sayAge)
// - use snake_case for properties and methods (e.g. name, age, say_name, say_age)
// - use kebab-case for properties and methods (e.g. name, age, say-name, say-age) , must be in quotes when using kebab-case
// - can be digits in properties and methods, but cannot start with a digit (e.g. name1, age2, sayName3)

var npci = {
    name: 'National Payments Corporation of India', // camelCase for properties
    establishedYear: 2008, // camelCase for properties
    'registres-addresses': 'Mumbai',
    1: 'one', // property name can be a digit, but cannot start with a digit
}

// how to access properties and methods of an object in javascript?

// 1. dot notation -> camelCase and snake_case properties and methods can be accessed using dot notation
// 2. bracket notation -> all properties and methods can be accessed using bracket notation, but it is recommended to use bracket notation for properties and methods that are not valid identifiers (e.g. 'registres-addresses', 1) or when the property name is stored in a variable
console.log(npci.name);
console.log(npci['name']);

// when to use dot notation and when to use bracket notation?
// - use dot notation when the property name is a valid identifier (e.g. name, age, sayName, sayAge)
// - use bracket notation when the property name is not a valid identifier (e.g. 'registres-addresses', 1) or when the property name is stored in a variable

var propertyName = 'name';
console.log(npci[propertyName]); // National Payments Corporation of India

var addr = npci["registres-addresses"];
console.log(addr); // Mumbai

var one = npci[1];
console.log(one); // one
