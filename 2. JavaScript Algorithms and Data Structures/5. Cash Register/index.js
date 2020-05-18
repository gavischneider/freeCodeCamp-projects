function checkCashRegister(price, cash, cid) {
  let changeOwed = cash - price;

  let reply = { status: "", change: [] };

  // Get total amount of money in cid
  let sum = 0;
  for (let i = 0; i < cid.length; i++) {
    sum += cid[i][1];
  }

  if (sum < changeOwed) {
    reply.status = "INSUFFICIENT_FUNDS";
    return reply;
  }

  if (sum === changeOwed) {
    reply.status = "CLOSED";
    reply.change = cid;
    return reply;
  }

  let money = [
    { name: "ONE HUNDRED", val: 100 },
    { name: "TWENTY", val: 20 },
    { name: "TEN", val: 10 },
    { name: "FIVE", val: 5 },
    { name: "ONE", val: 1 },
    { name: "QUARTER", val: 0.25 },
    { name: "DIME", val: 0.1 },
    { name: "NICKEL", val: 0.05 },
    { name: "PENNY", val: 0.01 },
  ];

  // Figure out the change
  let newCidArr = [];
  let curVal = 0;
  for (let i = 0; i < money.length; i++) {
    while (changeOwed >= money[i].val && curVal < cid[8 - i][1]) {
      changeOwed -= money[i].val;
      curVal += money[i].val;
      if (changeOwed === 0.009999999999994869) {
        changeOwed -= money[i].val;
        curVal += money[i].val;
      }
    }

    if (curVal > 0) {
      newCidArr.push([money[i].name, curVal]);
    }
    curVal = 0;
  }

  if (changeOwed > 0.01) {
    reply.status = "INSUFFICIENT_FUNDS";
    reply.change = [];
    return reply;
  }

  reply.status = "OPEN";
  reply.change = newCidArr;
  return reply;
}
