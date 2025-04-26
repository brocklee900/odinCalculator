function add(num1, num2) {
    return num1+num2;
}

function subtract(num1, num2) {
    return num1-num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case('+'):
            return add(num1, num2);
        case('-'):
            return subtract(num1, num2);
        case('*'):
            return multiply(num1, num2);
        case('/'):
            return divide(num1, num2);
        default:
            console.log("Invalid operator");
    }
}

let display = document.querySelector(".display");
let numbersDiv = document.querySelector(".numbers");
let operandsDiv = document.querySelector(".operands");
let number1 = 0;
let number2 = 0;
let operator;
let displayRefresh = false;

numbersDiv.addEventListener("click", (event) => {
	let id= event.target.getAttribute("id");
	if (id != null) {
  	if (display.textContent == "0" || displayRefresh) {
    	displayRefresh = false;
    	display.textContent = id;
		} else {
			display.textContent += id;
    }
  }
});

operandsDiv.addEventListener("click", (event) => {
	let id = event.target.getAttribute("id");
  switch (id) {
  	case("add"):
			operator = '+';
      number1 = +display.textContent;
      break;
    case("subtract"):
			operator = '-';
      number1 = +display.textContent;
      break;
    case("multiply"):
    	operator = '*';
      number1 = +display.textContent;
			break;
    case("divide"):
    	operator = '/';
      number1 = +display.textContent;
			break;
    case("calculate"):
    	number2 = +display.textContent;
      display.textContent = operate(number1, number2, operator);
      number1 = 0;
      number2 = 0;
      operator = '';
			break;
    case("clear"):
    	number1 = 0;
      number2 = 0;
      operator = '';
      display.textContent = "0";
			break;
    default:
    	console.log("Do nothing");
	}
  displayRefresh = true;
})
