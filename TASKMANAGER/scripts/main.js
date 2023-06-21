function sayHello(name) {
  console.log("Hello " + name);
}

function sum(num1, num2) {
  let total = num1 + num2;
  return total;
}

function printNumbers() {
  for (let index = 1; index <= 20; index++) {
    if (index != 7 && index != 13) {
      console.log(index);
    }
  }

  let color = "red";
  let age = 0;

  if (!color) {
    alert("Error: A color is needed");
  }
  if (!age) {
    alert("Error: Age is required");
  }
}

function init() {
  console.log("Task Manager");

  sayHello("John");
  sayHello("Jane");

  let name = "Anthony";
  sayHello(name);
  sayHello("name");

  let last = "Looney";
  sayHello(last);
  console.log(name, last);

  let total = sum(21, 21);
  console.log(total);

  printNumbers();
}

window.onload = init;
