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

// function deleteInvestment(status, investorId, investmentId) {
//   if (status == "pending") {
//     const http = new easyHTTP();
//     http.delete(
//       `http://165.227.229.49:8000/investors/${investorId}/investments/${investmentId}`,
//       function(err, data) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
//         }
//       }
//     );
//     alert("Success");
//   } else {
//     alert("Investment is already committed or has been cancelled");
//   }
// }

// listInvestors();
