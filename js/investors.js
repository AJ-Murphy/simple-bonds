function listInvestors() {
  const http = new easyHTTP();

  http.get("http://165.227.229.49:8000/investors?page=1&per_page=25", function(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      const response = JSON.parse(data);
      let output = "";

      response.data.forEach(function(entry) {
        const fullName = `${entry.first_name} ${entry.last_name}`,
          investorId = entry.id;

        output += `
          <div class="box">
            <div class="columns">
              <div class="column is-four-fifths">
                <div class="content">
                  <p>
                    <strong>${fullName}</strong>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="content">
                  <button id="open-portfolio" class="button" onclick="model(${investorId}, '${fullName}')">Button</button>
                </div>
              </div>
            </div>
          </div>
          `;
      });

      document.querySelector("#investors").innerHTML = output;
    }
  });
}

function model(investorId, fullName) {
  let model = "";
  model = `
    <div id="modal" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
    <header class="modal-card-head">
    <p class="modal-card-title">${fullName}</p>
    <button class="delete" onclick="closeModel()" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
    <table id="table" class="table">
    </table
    </section>
    </div>
    </div>
    `;
  getPortfolio(investorId);
  document.querySelector("#portfolio").innerHTML = model;
}

function closeModel() {
  console.log("it ran");
  document.querySelector(".modal").classList.remove("is-active");
}

function getPortfolio(investorId) {
  const http = new easyHTTP();

  http.get(
    `http://165.227.229.49:8000/investors/${investorId}/investments`,
    function(err, data) {
      if (err) {
        console.log(err);
      } else {
        const response = JSON.parse(data);
        let output = "";

        response.data.forEach(function(entry) {
          const bondName = entry.bond.name,
            type = entry.type,
            amount = entry.amount / 100,
            expectedReturn = entry.expected_return / 100,
            expectedProfit = entry.expected_profit / 100,
            status = entry.status,
            investmentId = entry.id;

          output += `
          <tr>
          <th>Bond name</th><td>${bondName}</td>
          <th>Type</th><td>${type}</td>
          <th>Amount</th><td>£${amount}</td>
          <th>Return</th><td>£${expectedReturn}</td>
          <th>Profit</th><td>£${expectedProfit}</td>
          <th>Status</th><td>${status}</td>
          <td><button class="delete" onclick="deleteInvestment('${status}', ${investorId}, ${investmentId})"></button></td>
          </tr>
          `;

          document.querySelector("#table").innerHTML = output;
        });
      }
    }
  );
}

function deleteInvestment(status, investorId, investmentId) {
  if (status == "pending") {
    const http = new easyHTTP();
    http.delete(
      `http://165.227.229.49:8000/investors/${investorId}/investments/${investmentId}`,
      function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
    alert("Success");
  } else {
    alert("Investment is already commited or already cancelled");
  }
}

listInvestors();
