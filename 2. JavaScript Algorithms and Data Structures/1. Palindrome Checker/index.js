function palindrome(str) {
  let evenFlag = false;
  let notPalin = false;
  // Removes all non-alphanumeric characters from the array
  let shorterArr = str.replace(/[^0-9a-z]/gi, "").toLowerCase();
  console.log(shorterArr);

  // If the arr length is even, then there is no value in the middle
  if (shorterArr.length % 2 === 0) {
    evenFlag = true;
  }

  let length = 0;
  if (evenFlag) {
    length = shorterArr.length / 2;
  } else {
    length = Math.floor(shorterArr.length / 2);
  }

  for (let i = 0; i < length; i++) {
    for (let j = shorterArr.length - 1; j >= length; j--) {
      if (shorterArr[i] !== shorterArr[j]) {
        notPalin = true;
      } else {
        i++;
      }
    }
  }
  if (notPalin) {
    return false;
  }
  return true;
}
