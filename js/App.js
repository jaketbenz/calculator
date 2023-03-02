const previousOperand = document.querySelector(".previous--operand");
const currentOperand = document.querySelector(".current--operand");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const numberButton = document.querySelectorAll("[data-number");
const operatorButton = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector(".equal");
const pointButton = document.querySelector(".point");

let firstNumber = "";
let secondNumber = "";
let operation = null;
let resetNeeded = false;

clearButton.addEventListener("click", clearScreen);
function clearScreen() {
	currentOperand.textContent = "0";
	previousOperand.textContent = "";
	firstNumber = "";
	secondNumber = "";
	operation = null;
}
function resetScreen() {
	currentOperand.textContent = "";
	resetNeeded = false;
}

deleteButton.addEventListener("click", deleteNumber);
function deleteNumber() {
	currentOperand.textContent = currentOperand.textContent
		.toString()
		.slice(0, -1);
}

numberButton.forEach((button) =>
	button.addEventListener("click", () => setNumber(button.textContent))
);
function setNumber(number) {
	if (currentOperand.textContent === "0" || resetNeeded) {
		resetScreen();
	}
	currentOperand.textContent += number;
}

operatorButton.forEach((button) =>
	button.addEventListener("click", () => setOperator(button.textContent))
);
function setOperator(operator) {
	if (operation !== null) {
		evaluate();
	}
	firstNumber = currentOperand.textContent;
	operation = operator;
	previousOperand.textContent = `${firstNumber} ${operation}`;
	resetNeeded = true;
}

equalButton.addEventListener("click", evaluate);
function evaluate() {
	if ((operation === null) | resetNeeded) return;
	if (operation === "÷" && currentOperand.textContent === "0") {
		// alert("Not possible to divide by zero...");
		// clearScreen();
		return;
	}
	secondNumber = currentOperand.textContent;
	currentOperand.textContent = operate(operation, firstNumber, secondNumber);
	previousOperand.textContent = `${firstNumber} ${operation} ${secondNumber} =`;
	console.log(firstNumber);
	console.log(operation);
	console.log(secondNumber);
	operation = null;
}
function addition(a, b) {
	return a + b;
}
function subtraction(a, b) {
	return a - b;
}
function multiplication(a, b) {
	return a * b;
}
function division(a, b) {
	return a / b;
}
function operate(operator, a, b) {
	a = Number(a);
	b = Number(b);
	switch (operator) {
		case "+":
			return addition(a, b);
		case "-":
			return subtraction(a, b);
		case "x":
			return multiplication(a, b);
		case "÷":
			if (b === 0) return null;
			else return division(a, b);
		default:
			return null;
	}
}
