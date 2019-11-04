class UI {
  constructor() {
    this.investors = document.querySelector("#investor-list");
    this.bonds = document.querySelector("#bonds");
    this.investment = document.querySelector("#investment");
    this.portfolios = document.querySelector("#portfolios");
    this.search = document.querySelector("#search");
    this.sort = document.querySelector("#investor-sort");
    this.alerts = document.querySelector("#alerts");

    this.toPence = num => num * 100;
    this.toPounds = num => (num / 100).toFixed(2);
    this.toPercent = num => (num * 100).toFixed(2);
    this.calcInvestment = (investment, interest, months) =>
      investment + ((investment * interest) / 12) * months;
  }

  selectInvestors(dataInput) {
    let output = "";

    dataInput.forEach(investor => {
      const { id, first_name: firstName, last_name: lastName } = investor,
        fullName = `${firstName} ${lastName}`;

      output += `<option value=${id}>${fullName}</option>`;
    });

    this.investors.innerHTML = output;
  }

  listInvestors(dataInput, search) {
    let output = "";
    console.log(dataInput);
    dataInput.forEach(investor => {
      const { first_name: firstName, last_name: lastName } = investor,
        fullName = `${firstName} ${lastName}`,
        regex = new RegExp(`^${search}`, "i");

      if (regex.test(fullName) || regex.test(undefined)) {
        output += `
          <li class="list-group-item d-flex justify-content-between align-items-center p-4">
          ${fullName}
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="getPortfolio(${investor.id}, '${fullName}')">View Investments</button>
          </li>
          `;
      }
    });

    this.investors.innerHTML = output;
  }

  showPortfolio(fullName) {
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
                    ${fullName}
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
    console.log(dataInput);

    dataInput.data.forEach(investment => {
      const {
          type,
          amount,
          expected_return: expectedReturnPence,
          expected_profit: expectedProfitPence,
          status,
          id: investmentId,
          bond_name: bondName,
          investor_id: investorId
        } = investment,
        expectedReturn = this.toPounds(expectedReturnPence),
        expectedProfit = this.toPounds(expectedProfitPence);

      output += `
      <tr>
        <td>${bondName}</td>
        <td>${type}</td>
        <td>£${amount}</td>
        <td>£${expectedReturn}</td>
        <td>£${expectedProfit}</td>
        <td>${status}</td>
        <td>
          <button type="button" class="btn btn-sm btn-danger" onclick="deleteInvestment('${status}', ${investorId}, ${investmentId})">
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

    switch (this.sort.value) {
      //Sort by name A-Z
      case "0":
        dataInput.sort((a, b) => a.name > b.name);
        break;
      //Sort by name Z-A
      case "1":
        dataInput.sort((a, b) => a.name < b.name);
        break;
      //Sort by duration High to Low
      case "2":
        dataInput.sort((a, b) => a.duration_months < b.duration_months);
        break;
      //Sort by duration Low to High
      case "3":
        dataInput.sort((a, b) => a.duration_months > b.duration_months);
        break;
      //Sort by Maturity High to Low
      case "4":
        dataInput.sort((a, b) => a.maturity_interest < b.maturity_interest);
        break;
      //Sort by Maturity Low to High
      case "5":
        dataInput.sort((a, b) => a.maturity_interest > b.maturity_interest);
        break;
      //Sort by Quarterly High to Low
      case "6":
        dataInput.sort((a, b) => a.quarterly_interest < b.quarterly_interest);
        break;
      //Sort by Quarterly Low to High
      case "7":
        dataInput.sort((a, b) => a.quarterly_interest > b.quarterly_interest);
        break;
    }

    dataInput.forEach(bond => {
      // Values
      const {
          id,
          name,
          duration_months: months,
          maturity_interest: maturity,
          quarterly_interest: quarterly
        } = bond,
        investorId = this.investors.value,
        investment = this.investment.value,
        investmentPence = this.toPence(investment),
        //Convert to %
        maturityInterest = this.toPercent(maturity),
        quarterlyInterest = this.toPercent(quarterly),
        //Calc investment
        quarterlyReturnPence = this.calcInvestment(
          investmentPence,
          quarterly,
          months
        ),
        maturityReturnPence = this.calcInvestment(
          investmentPence,
          maturity,
          months
        ),
        maturityReturn = this.toPounds(maturityReturnPence),
        quarterlyReturn = this.toPounds(quarterlyReturnPence);

      output += `
        <div class="col-lg-6 p-3">
        <div class="card h-100">
          <div class="card-header">
            <h3>${name}</h3>
            <p>Duration: ${months} Months</p>
          </div>
          <div class="card-body">
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <ul class="list-unstyled text-justify text-center">
                    <li class="card-text">
                      <span class="card-text_lg">${maturityInterest}%</span> <small>P.A</small>
                    </li>
                    <li class="card-text text-muted">Interest paid</li>
                    <li class="card-text text-muted"><strong>On Maturity</strong></li>
                    <li class="card-text">Expected return:</li>
                    <li class="card-text"><strong>£${maturityReturn}</strong></li>
                    <li class="card-text"><button type="button" class="btn btn-primary" onclick="makeInvestment(${investorId}, ${id}, 'maturity', ${maturityReturnPence})">Invest</button></li>
                  </ul>
                </div>
                <div class="col-sm">
                  <ul class="list-unstyled text-justify text-center">
                    <li class="card-text">
                    <span class="card-text_lg">${quarterlyInterest}%</span> <small>P.A</small>
                    </li>
                    <li class="card-text text-muted">Interest paid</li>
                    <li class="card-text text-muted"><strong>Quarterly</strong></li>
                    <li class="card-text">Expected return:</li>
                    <li class="card-text"><strong>£${quarterlyReturn}</strong></li>
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

  alertDanger(msg) {
    let output = `
    <div class="alert alert-danger alert-dismissible fade fixed-top show" role="alert">
      ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    `;
    this.alerts.innerHTML = output;
    setTimeout(() => {
      output = "";
      this.alerts.innerHTML = output;
    }, 6000);
  }

  alertSuccess(msg) {
    let output = `
    <div class="alert alert-success alert-dismissible fade fixed-top show" role="alert">
      ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    `;
    this.alerts.innerHTML = output;
    setTimeout(() => {
      output = "";
      this.alerts.innerHTML = output;
    }, 6000);
  }
}
