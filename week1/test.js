const greet = function(name) {
  return `Hello, ${name}`;
};
console.log(greet("Anna"));



function hello() {
  console.log("Hello!");
}

hello();


const sum = (a, b) => a + b;
console.log(sum(2, 3));

const square = x => x * x;
console.log(square(4));


let named = prompt("Enter your name: ")
const user = {
  name: named,
  sayHi() { console.log(`Hi, ${this.name}`); }
};
user.sayHi();
