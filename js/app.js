const data = new Data(),
  ui = new UI();

data
  .get("investors")
  .then(results => ui.showInvestors(results))
  .catch(err => console.log(err));

data
  .get("bonds")
  .then(results => ui.showBonds(results))
  .catch(err => console.log(err));

function makeInvestment(investorId, id, type, amount) {
  let input = {
    bond_id: id,
    type: type,
    amount: amount
  };

  data
    .post(`investors/${investorId}/investments`, input)
    .then(results => console.log(results))
    .catch(err => console.log(err));
}

ui.investment.addEventListener("input", e => {
  const userInput = e.target.value;

  if (userInput !== "") {
    data
      .get("bonds")
      .then(results => ui.showBonds(results))
      .catch(err => console.log(err));
  }
});
