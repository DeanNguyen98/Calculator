const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation');
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById('Delete');
const previousOperandtext = document.getElementById("previous-operand");
const currentOperandtext = document.getElementById("current-operand");
const equalButton = document.querySelector('[data-equal');


let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deletenumb() {
    currentOperand = currentOperand.toString().slice(0 , -1);
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function operator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    
}

function compute() {
    let computation
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch(operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case 'x':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        default: return; // this means if none of the case above is present then return the function(do not execute);
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';

}

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {

        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay;

    }

    
}
function updateDisplay() {
    const maxLength = 12; //max length for the input

    // Truncate current and previous operands if necessary
    const truncatedCurrent = currentOperand.length > maxLength ? currentOperand.slice(0, maxLength) : currentOperand;
    const truncatedPrevious = previousOperand.length > maxLength ? previousOperand.slice(0, maxLength) : previousOperand;

    currentOperandtext.innerText = getDisplayNumber(truncatedCurrent);
    
    if (operation != null) {
        previousOperandtext.innerText = `${getDisplayNumber(truncatedPrevious)} ${operation}`;
    } else {
        previousOperandtext.innerText = '';
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click" , () =>{
        appendNumber(button.innerText);
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click" , () =>{
        operator(button.innerText);
        updateDisplay();
    })
})

equalButton.addEventListener("click" , () => {
    compute();
    updateDisplay();
})

clearButton.addEventListener("click" , ()=>{
    clear();
    updateDisplay();
})

deleteButton.addEventListener("click" ,() =>{
    deletenumb();
    updateDisplay();
})

