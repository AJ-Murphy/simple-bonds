const data = new Data(),
  ui = new UI();

data
  .get("investors")
  .then(results => ui.selectInvestors(results))
  .catch(err => console.log(err));

data
  .get("bonds")
  .then(results => ui.listBonds(results))
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

  ui.alertSuccess("Investment Added!");
}

// Update bonds with new investor
ui.investors.addEventListener("change", () => {
  data
    .get("bonds")
    .then(results => ui.listBonds(results))
    .catch(err => console.log(err));
});

// Update investment on change
ui.investment.addEventListener("input", e => {
  const userInput = e.target.value;

  if (userInput !== "") {
    data
      .get("bonds")
      .then(results => ui.listBonds(results))
      .catch(err => console.log(err));
  }
});

// Filter bonds on change

ui.sort.addEventListener("change", () => {
  console.log(ui.sort.selectedOptions);
  data
    .get("bonds")
    .then(results => ui.listBonds(results))
    .catch(err => console.log(err));
});
