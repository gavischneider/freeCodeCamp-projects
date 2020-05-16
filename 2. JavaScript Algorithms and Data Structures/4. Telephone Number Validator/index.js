function telephoneCheck(str) {
  let arr = Array.from(str);

  // Check how many numbers, symbols, spaces and garbage
  let numCount = 0;
  let symbolCount = 0;
  let spaceCount = 0;
  let garbage = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "-" || arr[i] === "(" || arr[i] === ")") {
      symbolCount++;
    } else if (arr[i] === " ") {
      spaceCount++;
    } else if (arr[i] >= 0 && arr[i] < 10) {
      numCount++;
    } else {
      garbage++;
    }
  }

  if (garbage > 0) {
    // Invalid input
    return false;
  }

  if (numCount < 10) {
    // Not enough numbers
    return false;
  }

  if (numCount === 11 && arr[0] !== "1") {
    // Wrong area code
    return false;
  }

  if (numCount > 11) {
    // Too many numbers
    return false;
  }

  // Not enough ( or )
  if (arr.includes("(") && !arr.includes(")")) {
    return false;
  }
  if (arr.includes(")") && !arr.includes("(")) {
    return false;
  }

  if (arr[0] === "(" && arr[4] !== ")") {
    // Missing )
    return false;
  }
  return true;
}
