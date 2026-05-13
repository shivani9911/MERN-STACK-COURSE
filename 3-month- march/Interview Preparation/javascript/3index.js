// Spread operator - ...(3 dots)
// used for array and object          
// expand elements - we can add new elements to the array and object 
const array1 = [1, 2, 3]
const array2 = [4, 5, 6]

const FinalArray = [...array1, ...array2];
console.log(FinalArray)


// Rest Operator - ... (3 dots)
//we can pass n numbers of arguments
function num(...numbers) {
    console.log(numbers);
    return numbers   //.reduce((a,b) => a+b);
}
console.log(num(10 ,20 ,30 ,40 ,50 ));


// closures - nested function
function mainFunction() {
    let name = "Shiv"
    function nestedFunction() {
        console.log(name)
        let age = 24
        console.log(age)
    }
    return nestedFunction();
}
console.log(mainFunction());


// Immediately-Invoked function Expression(IIFE)
//we can write function without function name
; (function () {
    console.log("Immediately-Invoked function")
})();

// self-Invoked function 
//we can write function without function name
; (function () {
    console.log("self-Invoked function")
})();


//Higher Order function
const myFunction = (name) => {
    const a = 5
    console.log(a)
    return "Hello" + name
}
const processedFunction = (fun) => {
    console.log("processed Function..", fun(" SWARA"))
}
console.log(processedFunction(myFunction))

// Destructuring - Object , Array
//extract value easily from array/object
//make code shorter and cleaner

// Object Destructuring
const data = {
    name: "SWARA",
    email: "swara@gmail.com",
    age: 25
}

console.log(data, "--- full object")
const { name, email, age } = data

console.log(name)
console.log(age)

// Array Destructuring
const array = ["test1", "test2", "test3"]

const [a] = array
console.log(a);





// ==   check only value both side
// ===  check value and data type

const x = 10;
const y = "10";
if (x == y) {
    console.log(true);
}
else {
    console.log(false);
}
// o/p - true

const x1 = "6.3";
const y1 = 6.3;
if (x1 === y1) {
    console.log(true);
}
else {
    console.log(false);
}
// o/p - false

const p = "6.3";
const q = "10";
if (p === q) {
    console.log(true);
}
else {
    console.log(false);
}
// o/p - false

const n = 12;
const m = "12";
if (n == m) {
    console.log(true);
}
else {
    console.log(false);
}
// o/p - true