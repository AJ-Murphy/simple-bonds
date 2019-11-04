const data = new Data(),
  ui = new UI();

ui.search.addEventListener("keyup", e => {
  const searchText = e.target.value;
  console.log(searchText);
  data
    .get("investors")
    .then(results => ui.listInvestors(results, searchText))
    .catch(err => console.log(err));
});

data
  .get("investors")
  .then(results => ui.listInvestors(results))
  .catch(err => console.log(err));

function getPortfolio(investorId, fullName) {
  ui.showPortfolio(fullName);
  data
    .get(`investments/${investorId}`)
    .then(results => ui.portfolioData(results))
    .catch(err => console.log(err));
}

function deleteInvestment(status, investorId, investmentId) {
  console.log("ran");
  if (status == "pending") {
    data
      .delete(`investors/${investorId}/investments/${investmentId}`)
      .then(results => console.log(results))
      .catch(err => console.log(err));
    ui.alertSuccess("Investment cancelled!");
  } else if (status == "committed") {
    ui.alertDanger("Unable to cancel a committed investment!");
  } else {
    ui.alertDanger("Investment already cancelled!");
  }
}
