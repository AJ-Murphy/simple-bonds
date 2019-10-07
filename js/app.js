class Data {
  constructor(url) {
    this.url = url;
  }

  //fetch Investors
  async getInvestors() {
    const response = await fetch(`http://165.227.229.49:8000/${this.url}`),
      responseData = await response.json();

    let output = "";
    responseData.data.forEach(investor => {
      const fullName = `${investor.first_name} ${investor.last_name}`,
        id = investor.id;

      output += `<option value=${id}>${fullName}</option>`;
    });
    document.querySelector("#investor-list").innerHTML = output;
  }

  //fetch Bonds
  async getBonds() {
    const response = await fetch(`http://165.227.229.49:8000/${this.url}`),
      responseData = await response.json();

    let output = "";
    responseData.data.forEach(bond => {
      const name = bond.name,
        months = bond.duration_months,
        //round percentages
        quarterlyInterest = (bond.quarterly_interest * 100).toFixed(1) + "%",
        maturityInterest = (bond.maturity_interest * 100).toFixed(1) + "%",
        //get investment
        investment = 30000,
        // investment = document.querySelector("#investment").value,
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
                  <li class="card-text"><button type="button" class="btn btn-primary">Invest</button></li>
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
                  <li class="card-text"><button type="button" class="btn btn-primary">Invest</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    });
    document.querySelector("#bonds").innerHTML = output;
  }
}

const investors = new Data("investors");
investors
  .getInvestors()
  .then()
  .catch(err => console.log(err));

const bonds = new Data("bonds");
bonds
  .getBonds()
  .then()
  .catch(err => console.log(err));
