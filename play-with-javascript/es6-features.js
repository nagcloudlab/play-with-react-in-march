

// arrows
let numbers = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10];
numbers.sort((a, b) => a - b);
console.log(numbers);

// classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person1 = new Person('Alice', 30);
person1.greet();

// enhanced object literals
const name = 'Bob';
const age = 25;

const addrType = 'home';

const person2 = {
    name,
    age,
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    },
    [addrType + "-address"]: "123 Main St"
};

//template literals
const name2 = 'Charlie';
const age2 = 35;
const greeting = `Hello, my name is ${name2} and I am ${age2} years old.`;
console.log(greeting);


// destructuring


// Array destructuring

let numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, [9, 10]];

// let n1 = numbers2[0];
// let n2 = numbers2[1];
// let n3 = numbers2[2];
// let n4 = numbers2[3];
// let n5 = numbers2[4];

// or

let [n1, n2, n3, n4, n5, , foo, bar = 0, [baz1, baz2]] = numbers2;
console.log(n1, n2, n3, n4, n5);
console.log(foo, bar);
console.log(baz1, baz2);

// Object destructuring

const person3 = {
    name: 'Dave',
    age: 40,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

// let name3 = person3.name;
// let age3 = person3.age;
// let city = person3.address.city;
// let country = person3.address.country;

// or

let { name: name3, age: age3, address: { city, country } } = person3;
console.log(name3, age3);
console.log(city, country);

/*


function Card({ title, content }){
    return (
        <div className="card">
            <div className="card-header">{title}</div>
            <div className="card-body">{content}</div>
        </div>
    );
}

<Card title="My Card" content="This is a card component." />
<Card title="Another Card" content="This is another card component." />

*/


// default parameters
function greet(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}

greet(); // Hello, Guest!
greet('Eve'); // Hello, Eve!

// rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(4, 5)); // 9

// spread operator

let arr1 = [1, 2, 3];
let arr2 = [7, 8, 9, 10];

// create a new array by combining arr1 and arr2 without spread operator
let combined1 = arr1.concat(arr2);
console.log(combined1); // [1, 2, 3, 7, 8, 9, 10]

const arr3 = [...arr1, 4, 5, 6, ...arr2];


let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };

// create a new object by combining obj1 and obj2 without spread operator
let combinedObj1 = Object.assign({}, obj1, obj2);
console.log(combinedObj1); // { a: 1, b: 2, c: 3, d: 4 }

const obj3 = { ...obj1, e: 5, f: 6, ...obj2 };
console.log(obj3); // { a: 1, b: 2, e: 5, f: 6, c: 3, d: 4 }


let p1 = { x: 10, y: 20 };
let p2 = { y: 10, z: 30 };
let p3 = { ...p2, ...p1 };
console.log(p3); // { x: 10, y: 20, z: 30 }


// let and const
let count = 0;
count++;
console.log(count); // 1

const PI = 3.14;
// PI = 3.14159; // This will throw an error because PI is a constant



// iterators

// data-structure + iterator = iterable

let box = {
    _items: ['apple', 'banana', 'orange'],
    [Symbol.iterator]: function () {
        let index = 0;
        return {
            next: () => {
                if (this._items.length === 0) {
                    return {
                        done: true,
                        value: undefined
                    };
                } else {
                    let done = index >= this._items.length;
                    let value = !done ? this._items[index] : undefined;
                    index++;
                    return {
                        done,
                        value
                    };
                }
            }
        }
    }
};

// for...of loop
for (let item of box) {
    console.log(item);
}


let [item1, item2, item3] = box;
console.log(item1, item2, item3); // apple banana orange

let newFruits = [...box, 'grape', 'melon'];
console.log(newFruits); // ['apple', 'banana', 'orange', 'grape', 'melon']


// generators

function* eat() {
    console.log("Let's eat some snacks!");
    let chips = yield "Give me some chips.";
    console.log();
    let juice = yield "Now, I want some juice.";
    console.log();
    console.log("Yum! Chips and juice are delicious!");
    console.log(`I have ${chips} chips and ${juice} juice.`);
}




// ----------------------------