// Global variables
let firstNum = '0';
let secondNum = '0';
let operator = '';
let prevCalcNum = '0';

// Flags
let secondNumFlag = false;
let operatorFlag = false;
let decimalFlag = false;
let zeroFlag = true;
let prevCalcNumFlag = false;


// Set initial display to 0
$('#display').text(firstNum);


// Set event listeners on all the number buttons
$('.numberButton').on('click', function () {

  // Check if theres a previously calulated number on screen
  if (prevCalcNumFlag) {
    secondNumFlag = false;
    firstNum = this.getAttribute('data-value');
    $('#display').text(firstNum);
    prevCalcNum = '0';
    prevCalcNumFlag = false;
    return;
  }

  // Check if there's only a 0 on display
  if (zeroFlag) {

    // First check if user is entering a second 0{
    if (this.getAttribute('data-value') === '0') {
      return;
    }


    $('#display').text(this.getAttribute('data-value'));

    // update the correct num
    if (secondNumFlag) {
      secondNum = this.getAttribute('data-value');
    } else {
      firstNum = this.getAttribute('data-value');
    }
    zeroFlag = false;
    return;
  }

  // If we got here, we just want to add another digit to one ofe the nums
  if (secondNumFlag) {
    secondNum = secondNum.toString() + this.getAttribute('data-value');
    $('#display').text(secondNum);
    return;
  } else {
    // Its still the first num
    firstNum = firstNum.toString() + this.getAttribute('data-value');
    $('#display').text(firstNum);
    return;
  }

});

// Add event listener to clear button
$('#clear').on('click', function () {
  firstNum = '0';
  secondNum = '0';
  operator = '';
  prevCalcNum = '0';
  secondNumFlag = false;
  operatorFlag = false;
  decimalFlag = false;
  zeroFlag = true;
  prevCalcNumFlag = false;
  $('#display').text(0);
});

// Set event listener on decimal
$('#decimal').on('click', function () {
  zeroFlag = false;
  // Check if there's already a decimal in this number

  if (decimalFlag === false) {
    decimalFlag = true;

    // Check which num
    if (secondNumFlag) {
      secondNum = secondNum.toString() + '.';
      $('#display').text(secondNum);
      return;
    } else {
      firstNum = firstNum.toString() + '.';
      $('#display').text(firstNum);
      return;
    }
  } else {
    return;
  }
});

// Add event listeners on all the operators
$('.operator').on('click', function () {
  decimalFlag = false;





  // Check if theres a previously calulated number on screen
  if (prevCalcNumFlag) {
    console.log('PREVCALCNUMMMM: ' + prevCalcNum);
    firstNum = prevCalcNum;
    prevCalcNumFlag = false;
    secondNum = '0';
    secondNumFlag = true;
    operator = this.getAttribute('data-value');
    $('#display').text(operator);
    return;
  }



  // Check if theres already nums and an op
  if (secondNumFlag && operatorFlag) {
    let oldOperator = operator;
    let answer = '';
    switch (oldOperator) {
      case '/':
        answer = Number((firstNum / secondNum).toFixed(4));
        break;
      case 'X':
        answer = Number((firstNum * secondNum).toFixed(4));
        break;
      case '-':
        answer = Number((firstNum - secondNum).toFixed(4));
        break;
      case '+':
        answer = Number((Number(firstNum) + Number(secondNum)).toFixed(4));
        break;}
    ;

    firstNum = answer;
    secondNum = '0';
    secondNumFlag = true;
    zeroFlag = true;
    operator = this.getAttribute('data-value');
    $('#display').text(operator);

    if (secondNumFlag) {
      console.log('FIRST NUM: ' + firstNum);
    }


    return;
  };




  secondNumFlag = true;
  zeroFlag = true;
  // Check if theres already an operator
  if (operatorFlag) {
    operator = this.getAttribute('data-value');
    $('#display').text(operator);
    return;
  } else {
    // Theres no previous operator
    operatorFlag = true;
    operator = this.getAttribute('data-value');
    $('#display').text(operator);
    return;
  }
});

// Add event listener on the equals sign
$('#equals').on('click', function () {
  // Check if theres a second num
  //if(secondNumFlag){
  // Calculate
  console.log('op = ' + operator);
  switch (operator) {
    case '/':
      prevCalcNum = Number((firstNum / secondNum).toFixed(4));
      break;
    case 'X':
      prevCalcNum = Number((firstNum * secondNum).toFixed(4));
      break;
    case '-':
      prevCalcNum = Number((firstNum - secondNum).toFixed(4));
      break;
    case '+':
      prevCalcNum = Number((Number(firstNum) + Number(secondNum)).toFixed(4));
      break;}
  ;
  prevCalcNumFlag = true;
  $('#display').text(prevCalcNum);
  console.log('prevCalcNum: ' + prevCalcNum);
  console.log('firstNum: ' + firstNum + ", secondNum: " + secondNum + ", operator: " + operator);
  //}
});