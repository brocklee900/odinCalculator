function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
	if (num2 == 0) {
  	return DIVIDEBYZERO;
	}
  return num1 / num2;
}

function operate(num1, num2, operator) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      console.log("Invalid operator");
  }
}


let display = document.querySelector(".display");
let numbersDiv = document.querySelector(".numbers");
let operandsDiv = document.querySelector(".operands");
let number1 = null;
let number2 = null;
let operator = "";
let displayRefresh = false;
let operatorLastPressed = false;
const DIVIDEBYZERO = "bro???";

function checkDoubleOperator() {
  if (operator != "" && operatorLastPressed == false) {
    display.textContent = operate(number1, +display.textContent, operator);
  }
}

function calculateOnOperatorPress(newOperator) {
  if (display.textContent != DIVIDEBYZERO) {
      checkDoubleOperator();
      operator = newOperator;
      number1 = +display.textContent;
      operatorLastPressed = true;
      displayRefresh = true;
    }
}

function addDecimal() {
  if (displayRefresh == true) {
    display.textContent = "0.";
    displayRefresh = false;
  } else if (display.textContent.split(".").length == 1) {
    display.textContent += ".";
  }
}

function calculateEqual() {
  if (number1 != null && operator != '') {
    number2 = +display.textContent;
    display.textContent = operate(number1, number2, operator);
    number1 = 0;
    number2 = 0;
    operator = "";
    operatorLastPressed = false;
    displayRefresh = true;
  }
}

function updateDisplay(character) {
  if (display.textContent == "0" || displayRefresh) {
    displayRefresh = false;
    display.textContent = character;
  } else if (display.textContent.length < 16) {
    display.textContent += character;
  }
  operatorLastPressed = false;
}

numbersDiv.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  if (id != null) {
    updateDisplay(id);
  }
})

operandsDiv.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");

  switch (id) {
    case "add":
    	calculateOnOperatorPress("+");
      break;
    case "subtract":
    	calculateOnOperatorPress("-");
      break;
    case "multiply":
    	calculateOnOperatorPress("*");
      break;
    case "divide":
    	calculateOnOperatorPress("/");
      break;
    case "decimal":
      addDecimal();
      break;
    case "calculate":
      calculateEqual();
      break;
    case "clear":
      number1 = null;
      number2 = null;
      operator = "";
      operatorLastPressed = false;
      display.textContent = "0";
      displayRefresh = true;
      break;
    default:
      console.log("Do nothing");
  }
  
})

addEventListener("keydown", (event) => {
  console.log(event.key);
  switch(event.key) {
    case("Backspace"):
      if (displayRefresh == false) {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent.length == 0) {
          display.textContent = "0";
        }
      }
      break;
    case("+"):
      calculateOnOperatorPress("+")
      break;
    case("-"):
      calculateOnOperatorPress("-");
      break;
    case("*"):
      calculateOnOperatorPress("*");
      break;
    case("/"):
      calculateOnOperatorPress("/");
      break;
    case("."):
      addDecimal();
      break;
    case("Enter"):
      calculateEqual();
      break;
    case("="):
      calculateEqual();
      break;
    default:
      if (isNaN(+event.key) == false) {
        updateDisplay(+event.key);
      }
  }
})