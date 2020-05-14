function rot13(str) {
  console.log("?".charCodeAt(0));
  console.log("Z".charCodeAt(0));

  let newStr = [];

  for (let i = 0; i < str.length; i++) {
    // Check if the last char is punctuation
    if (i === str.length - 1 && str[i].charCodeAt() < 65) {
      newStr.push(str[i]);
      return newStr.join("");
    }

    // Check if current index is a space
    if (str[i] !== " ") {
      let charCode = +(str[i].charCodeAt() + 13);
      if (charCode > 90) {
        charCode -= 26;
      }
      console.log("CC: " + charCode);
      newStr.push(String.fromCharCode(charCode));
    } else {
      newStr.push(" ");
    }
  }
  console.log(newStr.join(""));
  return newStr.join("");
}
