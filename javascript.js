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

numbersDiv.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  if (id != null) {
    if (display.textContent == "0" || displayRefresh) {
      displayRefresh = false;
      display.textContent = id;
    } else if (display.textContent.length < 16) {
      display.textContent += id;
    }
    operatorLastPressed = false;
  }
})

operandsDiv.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");

  function checkDoubleOperator() {
    if (operator != "" && operatorLastPressed == false) {
      display.textContent = operate(number1, +display.textContent, operator);
    }
  }
  
  function calculate(newOperator) {
		if (display.textContent != DIVIDEBYZERO) {
      	checkDoubleOperator();
        operator = newOperator;
        number1 = +display.textContent;
        operatorLastPressed = true;
        displayRefresh = true;
			}
  }

  switch (id) {
    case "add":
    	calculate("+");
      break;
    case "subtract":
    	calculate("-");
      break;
    case "multiply":
    	calculate("*");
      break;
    case "divide":
    	calculate("/");
      break;
    case "decimal":
      if (displayRefresh == true) {
        display.textContent = "0.";
        displayRefresh = false;
      } else if (display.textContent.split(".").length == 1) {
        display.textContent += ".";
      }
      break;
    case "calculate":
			if (number1 != null && operator != '') {
      	number2 = +display.textContent;
        display.textContent = operate(number1, number2, operator);
        number1 = 0;
        number2 = 0;
        operator = "";
        operatorLastPressed = false;
        displayRefresh = true;
      }
      break
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