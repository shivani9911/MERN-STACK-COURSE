console.log("we are using javascript")

//varibles
const name ="Shivani"
var surname="kamble"
let middlename ="satish"

//function
// normal function 
function getMyfunction(){
    console.log("function 1")
}

 getMyfunction()


// Arrow function 
const getYourName =()=> {
    console.log("function 2")

}

getYourName() 

//parameter

const getMyfullName =(myName)=> {
    console.log("My Full Name",myName)
}

const myName ="Shivani Kamble"
getMyfullName(myName)

// Array

const myarray =["test1","test2","test3","test4"]
console.log(myarray, "Full Item print")
console.log(myarray[1],"print only index 1 value")
console.log(myarray[0])

//object
const studentDetails ={
    name:"Shivani Kamble",
    City :"Karad"
}
console.log(studentDetails ,"=> studentDetils full object")
console.log(studentDetails .name ,"=> studentDetils name only")
