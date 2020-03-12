let Money = 100;
let Points = 1;

module.exports = {
  calculatePoints(moneySpent) {
    return (moneySpent / Money) * Points;
  }
};
