let display = document.getElementById("display");

function appendValue(value) {
    const lastChar = display.innerText.slice(-1);

    // Prevent multiple decimal points in a number
    if (value === '.' && lastChar === '.') return;

    // Prevent repeated operators (like +*, -/)
    if (isOperator(lastChar) && isOperator(value)) {
        display.innerText = display.innerText.slice(0, -1) + value;
        return;
    }

    // Prevent leading zeros unless after operator
    if (display.innerText === "0" && value !== ".") {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%', '**'].includes(char);
}

function clearDisplay() {
    display.innerText = "0";
}

function deleteChar() {
    display.innerText = display.innerText.length === 1 ? "0" : display.innerText.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = display.innerText
            .replace(/√/g, "Math.sqrt")
            .replace(/π/g, "Math.PI")
            .replace(/e/g, "Math.E")
            .replace(/log/g, "Math.log10")
            .replace(/ln/g, "Math.log")
            .replace(/exp/g, "Math.exp")
            .replace(/abs/g, "Math.abs");

        const result = eval(expression);
        if (result === Infinity || isNaN(result)) {
            display.innerText = "Error";
        } else {
            display.innerText = roundResult(result);
        }
    } catch {
        display.innerText = "Error";
    }
}

function square() {
    try {
        let val = evalSafe(display.innerText);
        display.innerText = roundResult(val * val);
    } catch {
        display.innerText = "Error";
    }
}

function squareRoot() {
    try {
        let val = evalSafe(display.innerText);
        if (val < 0) throw new Error();
        display.innerText = roundResult(Math.sqrt(val));
    } catch {
        display.innerText = "Error";
    }
}

function reciprocal() {
    try {
        let val = evalSafe(display.innerText);
        if (val === 0) throw new Error();
        display.innerText = roundResult(1 / val);
    } catch {
        display.innerText = "Error";
    }
}

function negate() {
    try {
        let val = evalSafe(display.innerText);
        display.innerText = roundResult(-val);
    } catch {
        display.innerText = "Error";
    }
}

function logBase10() {
    try {
        let val = evalSafe(display.innerText);
        if (val <= 0) throw new Error();
        display.innerText = roundResult(Math.log10(val));
    } catch {
        display.innerText = "Error";
    }
}

function naturalLog() {
    try {
        let val = evalSafe(display.innerText);
        if (val <= 0) throw new Error();
        display.innerText = roundResult(Math.log(val));
    } catch {
        display.innerText = "Error";
    }
}

function expOf() {
    try {
        let val = evalSafe(display.innerText);
        display.innerText = roundResult(Math.exp(val));
    } catch {
        display.innerText = "Error";
    }
}

function absVal() {
    try {
        let val = evalSafe(display.innerText);
        display.innerText = roundResult(Math.abs(val));
    } catch {
        display.innerText = "Error";
    }
}

// Rounds the result to 6 decimal places max
function roundResult(num) {
    return parseFloat(num.toFixed(6));
}

// Safe eval with parenthesis check
function evalSafe(expr) {
    if (!isBalanced(expr)) throw new Error();
    return eval(expr);
}

// Check for balanced parentheses
function isBalanced(str) {
    let stack = [];
    for (let char of str) {
        if (char === '(') stack.push(char);
        else if (char === ')') {
            if (!stack.length) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}