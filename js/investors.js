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

function getPortfolio(investorId) {
  ui.showPortfolio(investorId);
  data
    .get(`investors/${investorId}/investments`)
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
    alert("Success");
  } else {
    alert("Failed");
  }
}
