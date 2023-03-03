const previousOperand = document.querySelector(".outputContainer__previous");
const currentOperand = document.querySelector(".outputContainer__current");
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

const clearScreen = () => {
	currentOperand.textContent = "0";
	previousOperand.textContent = "";
	firstNumber = "";
	secondNumber = "";
	operation = null;
};
clearButton.addEventListener("click", clearScreen);

const resetScreen = () => {
	currentOperand.textContent = "";
	resetNeeded = false;
};

const deleteNumber = () => {
	currentOperand.textContent = currentOperand.textContent
		.toString()
		.slice(0, -1);
};
deleteButton.addEventListener("click", deleteNumber);

const setNumber = (number) => {
	// for some reason I can't set it to ===, will revisit
	if ((currentOperand.textContent = "0" || resetNeeded)) {
		resetScreen();
	}
	currentOperand.textContent += number;
};
numberButton.forEach((button) =>
	button.addEventListener("click", () => setNumber(button.textContent))
);

const setOperator = (operator) => {
	if (operation !== null) {
		evaluate();
	}
	firstNumber = currentOperand.textContent;
	operation = operator;
	previousOperand.textContent = `${firstNumber} ${operation}`;
	resetNeeded = true;
};
operatorButton.forEach((button) =>
	button.addEventListener("click", () => setOperator(button.textContent))
);

const setPoint = () => {
	if (resetNeeded) {
		resetScreen();
	}
	if (currentOperand.textContent === "") {
		currentOperand.textContent === "0";
	}
	if (currentOperand.textContent.includes(".")) {
		return;
	}
	currentOperand.textContent += ".";
};
pointButton.addEventListener("click", setPoint);

const round = (number) => {
	return Math.round(number * 1000) / 1000;
};

const evaluate = () => {
	if ((operation === null) | resetNeeded) return;
	if (operation === "÷" && currentOperand.textContent === "0") {
		alert("Not possible to divide by zero...");
		clearScreen();
		return;
	}
	secondNumber = currentOperand.textContent;
	currentOperand.textContent = round(
		operate(operation, firstNumber, secondNumber)
	);
	previousOperand.textContent = `${firstNumber} ${operation} ${secondNumber} =`;
	operation = null;
};
equalButton.addEventListener("click", evaluate);

const addition = (a, b) => {
	return a + b;
};
const subtraction = (a, b) => {
	return a - b;
};
const multiplication = (a, b) => {
	return a * b;
};
const division = (a, b) => {
	return a / b;
};
const operate = (operator, a, b) => {
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
};
