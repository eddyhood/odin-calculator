//global variables
let display = [];
let memory = [];
let sign = '';

//memory functions

//Math functions
function addNums(a, b) {
    answer = a + b;
    memory = [answer];
    return(answer);
};

function subtractNums(a, b) {
    answer = a - b;
    memory = [answer];
    return(answer);
}

function multiplyNums(a, b) {
    console.log('I made it')
    answer = a * b;
    memory = [answer];
    return(answer);
}

function divideNums(a, b) {
    answer = a / b;
    memory = [answer];
    return(answer);
}

function findExponent(base, power) {
    answer = base ** power;
    memory = [answer];
    return(answer);
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

function squareRoot() {

    let toSquare = convertDisplay();
    let square = findPerfectSquare(toSquare);
    let remainder = toSquare - (square * square);
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
    
    display = [];
    memory = [parseFloat(answer)];
    displayWindow.innerText = answer;
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
function operate(operator) {
    let firstNum = memory[memory.length-2];
    console.log('first Num' + typeof(firstNum) + firstNum)
    let currentNum = convertDisplay();
    console.log('second Num' + typeof(currentNum) + currentNum)

    if(firstNum && currentNum && memory.length > 0) {
        sign = '';
    }

    switch(operator) {
        case '+':
            return addNums(firstNum, currentNum);
            break;
        case '-':
            return subtractNums(firstNum, currentNum);
            break;
        case 'X':
            console.log('here too')
            return multiplyNums(firstNum, currentNum);
            break;
        case '/':
            return divideNums(firstNum, currentNum);
            break;
        case 'Xy':
            return findExponent(firstNum, currentNum);
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
const allClearBtn = document.getElementById('all-clear-btn');
const addBtn = document.getElementById('tall-plus');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const equalBtn = document.getElementById('tall-equal');
const squareRootBtn = document.getElementById('square-root');
const exponentBtn = document.getElementById('exponent');
const changeSignBtn = document.getElementById('change-sign');
const percentBtn = document.getElementById('percent');
const removePercentBtn = document.getElementById('remove-percent');


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
allClearBtn.addEventListener('click', () => clearAll());
addBtn.addEventListener('click', e => addToMemory(e));
subtractBtn.addEventListener('click', (e) => addToMemory(e));
multiplyBtn.addEventListener('click', (e) => addToMemory(e));
divideBtn.addEventListener('click', (e) => addToMemory(e));
equalBtn.addEventListener('click', (e) => addToMemory(e));
squareRootBtn.addEventListener('click', squareRoot);
exponentBtn.addEventListener('click', (e) => addToMemory(e));
changeSignBtn.addEventListener('click',changeSign);
percentBtn.addEventListener('click', changeToPercent);removePercentBtn.addEventListener('click', () => console.log('boom'));

//combines values in display array, and makes them a number
function convertDisplay() {
    let stringNum = display.join('');
    let num = parseFloat(stringNum);
    return num;
};

//function to change to %
function changeToPercent() {
    num = convertDisplay();
    display = [num * .01];
    displayWindow.innerText = display;
};

// update display with clicks
function updateDisplay(event) {
    //Update display
    let figure = event.target.innerText;
    display.push(parseInt(figure));
    let updatedDisplay = convertDisplay();

    displayWindow.innerText = updatedDisplay;
    console.log('display ' + display)
    console.log('memory ' + memory)
};

function addToMemory(event) {
    if(display.length > 0) {
        //Store what is in display to memory
        let num = convertDisplay();
        console.log('tyoe of memory ' + typeof(memory))
        memory.push(num);
        
        if(memory.length > 1){
            //Run operation
            total = operate(sign);
            displayWindow.innerText = total;
            display = [];
        } else {
            display = [];
        }
        console.log('memory' + memory);
        console.log('display' + display);
    
    operator = event.target.innerText;
    //update global variable to hold current operation
    sign = operator;
    console.log('sign' + sign);
    } else {
        //Get new operator since prior function has completed. This gets us ready for the next operaiton.
        operator = event.target.innerText;
        sign = operator;
        console.log('new sign ' + sign)
    }
};

//Function to call for the c button
function clearEntry() {
    display = [];
    if(memory.length > 0) {
        memory.pop(-1);
    }
    displayWindow.innerText = 0;
};

//function to call for the AC button
function clearAll() {
    display = []
    memory = []
    sign = ''
    displayWindow.innerText = 0;
};

//function to change signs for the +/- button
function changeSign() {
    let num = convertDisplay();
    let change = [num *= -1]
    displayWindow.innerText = change;
    display = [change];
    
};

function holdOperator (operator) {
    let sign = operator;

    //check to see how many values are in 

};
