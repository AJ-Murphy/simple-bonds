class UI {
  constructor() {
    this.investors = document.querySelector("#investor-list");
    this.bonds = document.querySelector("#bonds");
    this.investment = document.querySelector("#investment");
    this.portfolios = document.querySelector("#portfolios");
    this.search = document.querySelector("#search");
  }

  selectInvestors(dataInput) {
    let output = "";

    dataInput.data.forEach(investor => {
      output += `<option value=${investor.id}>${investor.first_name} ${investor.last_name}</option>`;
    });

    this.investors.innerHTML = output;
  }

  listInvestors(dataInput, search) {
    let output = "",
      regex;

    dataInput.data.forEach(investor => {
      let fullName = `${investor.first_name} ${investor.last_name}`;

      regex = new RegExp(`^${search}`, "i");

      if (regex.test(fullName) || regex.test(undefined)) {
        output += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
          ${investor.first_name} ${investor.last_name}
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="getPortfolio(${investor.id})">View Investments</button>
          </li>
          `;
      }
    });

    this.investors.innerHTML = output;
  }

  showPortfolio(investorId) {
    let output = "";

    output = `
      <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-scrollable modal-lg"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalScrollableTitle">
                    investor.bond.name
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Bond Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Return</th>
                        <th scope="col">Profit</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody id="table-data">
                                         
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;

    this.portfolios.innerHTML = output;
  }

  portfolioData(dataInput) {
    let output = "";

    dataInput.data.forEach(investment => {
      const bondName = investment.bond.name,
        type = investment.type,
        amount = (investment.amount / 100).toFixed(2),
        expectedReturn = (investment.expected_return / 100).toFixed(2),
        expectedProfit = (investment.expected_profit / 100).toFixed(2),
        status = investment.status,
        investmentId = investment.id,
        investorId = investment.investor.id;

      output += `
      <tr>
        <td>${bondName}</td>
        <td>${type}</td>
        <td>£${amount}</td>
        <td>£${expectedReturn}</td>
        <td>£${expectedProfit}</td>
        <td>${status}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteInvestment('${status}', ${investorId}, ${investmentId})">
            Cancel
          </button>
        </td>
      </tr>
      `;
    });

    document.querySelector("#table-data").innerHTML = output;
  }

  listBonds(dataInput) {
    let output = "";

    dataInput.data.forEach(bond => {
      const id = bond.id,
        investorId = this.investors.value,
        name = bond.name,
        months = bond.duration_months,
        //round percentages
        quarterlyInterest = (bond.quarterly_interest * 100).toFixed(1) + "%",
        maturityInterest = (bond.maturity_interest * 100).toFixed(1) + "%",
        //get investment
        investment = this.investment.value,
        investmentPence = investment * 100,
        //calculate investment
        quarterlyReturnPence =
          investmentPence +
          ((investmentPence * bond.quarterly_interest) / 12) * months,
        maturityReturnPence =
          investmentPence +
          ((investmentPence * bond.maturity_interest) / 12) * months,
        quarterlyReturn = (quarterlyReturnPence / 100).toFixed(2),
        maturityReturn = (maturityReturnPence / 100).toFixed(2);

      output += `
        <div class="col-6 p-3">
        <div class="card">
          <div class="card-header">
            <h3>${name}</h3>
            <p>Duration: ${months} Months</p>
          </div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col">
                  <ul class="list-unstyled text-justify text-center">
                    <li class="card-text">
                      <strong>${maturityInterest}</strong> <small>P.A</small>
                    </li>
                    <li class="card-text text-muted">Interest paid</li>
                    <li class="card-text text-muted"><strong>On Maturity</strong></li>
                    <li class="card-text">Expected return:</li>
                    <li class="card-text">£${maturityReturn}</li>
                    <li class="card-text"><button type="button" class="btn btn-primary" onclick="makeInvestment(${investorId}, ${id}, 'maturity', ${maturityReturnPence})">Invest</button></li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="list-unstyled text-justify text-center">
                    <li class="card-text">
                      <strong>${quarterlyInterest}</strong> <small>P.A</small>
                    </li>
                    <li class="card-text text-muted">Interest paid</li>
                    <li class="card-text text-muted"><strong>Quarterly</strong></li>
                    <li class="card-text">Expected return:</li>
                    <li class="card-text">£${quarterlyReturn}</li>
                    <li class="card-text"><button type="button" class="btn btn-primary" onclick="makeInvestment(${investorId}, ${id}, 'quarterly', ${quarterlyReturnPence})">Invest</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });

    this.bonds.innerHTML = output;
  }
}
