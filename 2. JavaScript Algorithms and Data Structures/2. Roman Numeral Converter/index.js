function convertToRoman(num) {
  let romanStr = [];
  let x = num;

  const romanTableVals = [
    1,
    4,
    5,
    9,
    10,
    40,
    50,
    90,
    100,
    400,
    500,
    900,
    1000,
    4000,
  ];
  const romanTableNumerals = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
    "MMMM",
  ];

  while (x > 0) {
    let v = 0;
    let foundDec = false;
    let i = -1;

    while (!foundDec) {
      i++;
      v = romanTableVals[i];
      if (romanTableVals[i] <= x && x < romanTableVals[i + 1]) {
        foundDec = true;
      }
    }
    x -= v;

    // Add the newest letter to the arr
    romanStr.push(romanTableNumerals[i]);
  }

  console.log(romanStr.join("").toString());
  return romanStr.join("").toString();
}
