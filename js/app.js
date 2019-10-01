function listInvestors() {
  const http = new easyHTTP();

  http.get("http://165.227.229.49:8000/investors", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const response = JSON.parse(data);
      let output = "";

      response.data.forEach(function(entry) {
        const fullName = `${entry.first_name} ${entry.last_name}`,
          id = entry.id;

        output += `<option value=${id}>${fullName}</option>`;
      });
      document.querySelector("#investor-list").innerHTML = output;
    }
  });
}

function listBonds() {
  const http = new easyHTTP();

  http.get("http://165.227.229.49:8000/bonds", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const response = JSON.parse(data);
      let output = "";

      response.data.forEach(function(entry) {
        //values
        const id = entry.id,
          investorId = document.querySelector("#investor-list").options[
            document.querySelector("#investor-list").selectedIndex
          ].value,
          name = entry.name,
          months = entry.duration_months,
          //round percentages
          quarterlyInterest = (entry.quarterly_interest * 100).toFixed(1) + "%",
          maturityInterest = (entry.maturity_interest * 100).toFixed(1) + "%",
          //get investment
          investment = document.querySelector("#investment").value,
          investmentPence = investment * 100,
          //calculate investment
          quarterlyReturnPence =
            investmentPence +
            ((investmentPence * entry.quarterly_interest) / 12) * months,
          maturityReturnPence =
            investmentPence +
            ((investmentPence * entry.maturity_interest) / 12) * months,
          quarterlyReturn = (quarterlyReturnPence / 100).toFixed(2);
        maturityReturn = (maturityReturnPence / 100).toFixed(2);

        output += `
              <div class="column is-half">
                <div class="card">
                  <header class="card-header flex-direction-d">
                    <p class="card-header-title">${name}</p>
                    <p class="card-header-title">Duration ${months} months</p>
                  </header>
                  <div class="card-content">
                    <div class="columns">
                      <div class="column">
                        <div class="field">
                          <label class="label">Interest paid</label>
                          <div class="control">
                            <input
                            class="input"
                            type="text"
                            value="${maturityInterest}"
                            disabled
                            />
                        </div>
                        <p class="help">On Maturity</p>
                      </div>
                      <div class="field">
                        <label class="label">Expected gross return:</label>
                        <div class="control">
                          <input
                          class="input"
                          type="text"
                          value="£${maturityReturn}"
                          disabled
                          />
                        </div>
                      </div>
                      <div class="control">
                        <button id="maturity-return" class="button is-primary" onclick="makeInvestment(${id}, ${investorId}, 'maturity', ${maturityReturnPence})">Invest</button>
                      </div>
                    </div>
                    <div class="column">
                      <div class="field">
                        <label class="label">Interest paid</label>
                        <div class="control">
                          <input
                          class="input"
                          type="text"
                          value="${quarterlyInterest}"
                          disabled
                          />
                          <p class="help">Quarterly</p>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">Expected gross return:</label>
                        <div class="control">
                          <input
                          class="input"
                          type="text"
                          value="£${quarterlyReturn}"
                          disabled
                          />
                        </div>
                      </div>
                      <div class="control">
                        <button id="quaterly-return" class="button is-primary" onclick="makeInvestment(${id}, ${investorId}, 'quarterly', ${quarterlyReturnPence})">Invest</button>
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
  });
}

function makeInvestment(id, investorId, type, amount) {
  data = {
    bond_id: id,
    type: type,
    amount: amount
  };

  //Create Post
  const http = new easyHTTP();

  http.post(
    `http://165.227.229.49:8000/investors/${investorId}/investments`,
    data,
    function(err, post) {
      if (err) {
        console.log(err);
      } else {
        console.log(post);
      }
    }
  );
}

listInvestors();
listBonds();

document.querySelector("#search").addEventListener("click", listBonds);
