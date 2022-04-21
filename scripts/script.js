//global variables
let display = [];
let memory = [];

//memory functions

//Math functions
function addNums(a, b) {
    console.log(a + b);
};

function subtractNums(a, b) {
    display = a - b;
}

function multiplyNums(a, b) {
    display = a * b;
}

function divideNums(a, b) {
    display = a / b;
}

function findExponent(base, power) {
    display = base ** power;
}

//Calculate square root. 
/* Look for a perfect square that is less than or equal 
to the number received. The divide the num received by the perfect squre base to get the remainder. THen add two zeros to the remainder. Then, create the following template: (double base) _ x _ <= remainder 0 0
The goal is to find a 3 digit number whos last digit goes after the period. When you multiply the three digit number by that last number, it needs to be <= the remainder + 00. Then subtract. That number you multiplied by is now the tenths place of the square root. Now add two more zeros and do it again. Double the current awnswer to remove the decimal, then add that to the new template. 
Example: 
Find the square root of 38
1. Largest perfect square is 36 (6 X 6).
2.  38 / 6 = 6 r 2
--curent answer 6._
3.  Add to zeros to remainder (200)
4. Fill (double base) _ x _ <= remainder 0 0
5. 12 _  x _ <= 200
6. 121 x 1 <= 200
7. 200 - 121 = 79
--Current answer 6.1_
8. Double 61 (6.1 without decimal) and start template again. 
9. 122_ x _ <= 7900
10. 1226 x 6 <= 7900
11. Curent and final awnswer to two decimals is 6.16
*/

function squareRoot(a) {

    let square = findPerfectSquare(a);
    let remainder = a - (square * square);
    let remainder100 = (remainder * 100);
    let doubleBase = String(square * 2);
    let maxCompare = 0;
    let tenth;
    let hundreth; 
    
    //calculate value of tenth place
    for(i = 1; i <= remainder100; i++) {
        let compareNum = parseInt(doubleBase + i);
        if(compareNum * i <= remainder100) {
            maxCompare = compareNum;
            tenth = i;
        } else {
            break;
        };
    };
    
    let doubleTenth = (String(square) + String(tenth));
    let newSquare = parseInt(doubleTenth);
    let numDoubleTenth = String(newSquare * 2);
    let hundrethRemainder = remainder100 - maxCompare;
    let hundrethRem100 = hundrethRemainder * 100;
    let hundrethMaxCompare = 0;


    //Calculate value of hundreth place
    for(i = 1; i <= hundrethRem100; i++) {
        let compareNum = parseInt(numDoubleTenth + i);
        if(compareNum * i <= hundrethRem100) {
            hundrethMaxCompare = compareNum;
            hundreth = i;
        } else {
            break;
        };
    };
    
    
    let answer = parseFloat(square + '.' + tenth + hundreth);
    
    return answer;
}

function findPerfectSquare(n) {
    let winner = 0;
    for(i = 0; i < n; i++) {
        if((i * i) <= n && (i * i) > winner && (i * i) % i == 0) {
            winner = i;
        }
    }
    return winner;
}

//Function that will run calculations
function operate(a, operator, b) {
    switch(operator) {
        case '+':
            addNums(a, b);
            break;
        case '-':
            subtractNums(a, b);
            break;
        case '*':
            multiplyNums(a, b);
            break;
        case '/':
            divideNums(a, b);
            break;
        case '^':
            findExponent(a, b);
            break;
    }
};


//Create functionality on the calculator
const displayWindow = document.getElementById('display-window');
const btn0 = document.getElementById('num0');
const btn1 = document.getElementById('num1');
const btn2 = document.getElementById('num2');
const btn3 = document.getElementById('num3');
const btn4 = document.getElementById('num4');
const btn5 = document.getElementById('num5');
const btn6 = document.getElementById('num6');
const btn7 = document.getElementById('num7');
const btn8 = document.getElementById('num8');
const btn9 = document.getElementById('num9');
const clearBtn = document.getElementById('clear-btn');
const addBtn = document.getElementById('tall-plus');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const equalBtn = document.getElementById('tall-equal');

//Add event listeners
btn0.addEventListener('click', e => updateDisplay(e));
btn1.addEventListener('click', e => updateDisplay(e));
btn2.addEventListener('click', e => updateDisplay(e));
btn3.addEventListener('click', e => updateDisplay(e));
btn4.addEventListener('click', e => updateDisplay(e));
btn5.addEventListener('click', e => updateDisplay(e));
btn6.addEventListener('click', e => updateDisplay(e));
btn7.addEventListener('click', e => updateDisplay(e));
btn8.addEventListener('click', e => updateDisplay(e));
btn9.addEventListener('click', e => updateDisplay(e));
clearBtn.addEventListener('click', () => clearEntry());
addBtn.addEventListener('click', () => addToMemory());
subtractBtn.addEventListener('click', () => addToMemory());
multiplyBtn.addEventListener('click', () => addToMemory());
divideBtn.addEventListener('click', () => addToMemory());



// update display with clicks
function updateDisplay(event) {
    //Update display
    let figure = event.target.innerText;
    display.push(parseInt(figure));
    let numString = display.join('')
    let updatedDisplay = parseInt(numString);

    displayWindow.innerText = updatedDisplay;
    console.log(display)
    console.log(memory)
}

function removeDisplay() {
    let numString = display.join('');
}

function clearEntry() {
    display = [];
    if(memory.length > 0) {
        memory.pop(-1);
    }
    displayWindow.innerText = 0;
};

//takes what is on display and adds to memory. Use when an operator key is pressed. 
function addToMemory() {
    if(display.length > 0) {
        let stringNum = display.join('');
        let num = parseInt(stringNum);
        memory.push(num);
        display = [];
        console.log(memory);
    } else{
        memory = [];
        return;
    }

    }
