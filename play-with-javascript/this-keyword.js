"use strict";


function add(a, b) {
    return a + b;
}
console.log(add(2, 3));

/*
this -> an object who owns current-scope
*/

// Notes
// global-scope owned by global-object (window in browser, global in node)

console.log(this)

function sayName() {
    console.log('My name is ' + this.name);
}

// sayName();

// 2 types of function binding
// 1. static binding -> this is determined at the time of function definition
// 2. dynamic binding -> this is determined at the time of function invocation


// 1. static binding
let person1 = {
    name: 'Alice',
    sayName: sayName // static binding
}
console.log(person1);
person1.sayName(); // My name is Alice

let person2 = {
    name: 'Bob',
    sayName: sayName // static binding
}
console.log(person2);
person2.sayName(); // My name is Bob

// 2. dynamic binding
let person3 = {
    name: 'Charlie'
}
Object.preventExtensions(person3);

sayName.call(person3, "arg1", "arg2"); // My name is Charlie
sayName.apply(person3, ["arg1", "arg2"]); // My name is 
let sayNameWithCharlie = sayName.bind(person3, "arg1", "arg2"); // My name is Charlie
sayNameWithCharlie();
sayNameWithCharlie();

//--------------------------------------------


// let employee = {
//     eName: 'David',
//     sayName: function () {
//         console.log('My name is ' + this.eName);
//     }
// }

// employee.sayName(); 

//-------------------------------------------




// Quiz


const trainer = {
    name: 'Nag',
    doTeach: function () {
        console.log(this.name + ' teaching JS');
        // const askQues = function (ques) {
        //     console.log(this.name + ' answering ' + ques);
        // }
        const askQues = (ques) => {
            console.log(this.name + ' answering ' + ques);
        }
        return askQues;
    }
}

const askQues = trainer.doTeach(); // Nag teaching JS
askQues('What is closure?');  // 
// askQues.call(trainer, 'What is closure?'); // Nag answering What is closure?

let newTrainer = {
    name: 'Ria'
}
askQues.call(newTrainer, 'What is hoisting?'); // Ria answering What is hoisting?


//-----------------------


const rf = function () {
    console.log(this);
}
const af = () => {
    console.log(this);
}

rf();
af();

let o1 = { name: 'o1' };
o1.rf = rf;
o1.af = af;

o1.rf(); // this -> o1
o1.af(); // this -> global-object (window in browser, global in node) because arrow function does not have its own this, it inherits from the parent scope which is global-scope in this case.