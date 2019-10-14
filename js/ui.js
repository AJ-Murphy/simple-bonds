class UI {
  constructor() {
    this.investors = document.querySelector("#investor-list");
    this.bonds = document.querySelector("#bonds");
    this.investment = document.querySelector("#investment");
  }

  showInvestors(dataInput) {
    let output = "";

    dataInput.data.forEach(investor => {
      output += `<option value=${investor.id}>${investor.first_name} ${investor.last_name}</option>`;
    });

    this.investors.innerHTML = output;
  }

  showBonds(dataInput) {
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
