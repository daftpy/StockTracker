function TransactionInput(props) {
  /*
    newHolding will hold the value of the inputElements.
    When the user hits submit, the values are sent to the
    python server, validated, saved, and returns a 
    validation response.
  */
  const newHolding = {};
  const inputStyles = {
    width: '100%',
    justifyContent : 'space-between',
    alignItems: 'center'
  }
  const inputElements = document.getElementsByTagName('input');

  function handleClick(e) {
    e.preventDefault();
    /* Clone the state before modifying */
    const holdings = Object.assign({}, props.holdings);
    const transactions = props.transactions.slice();
    /* 
      Set the new holding and push it to the holdings array.
      Update the holdings and transaction state.
    */
    holdings[newHolding["ticker"]] = newHolding["stockTotal"];
    transactions.push(newHolding);
    props.setHoldings(holdings);
    props.setTransactions(transactions);
    /* Loop through the inputElements and reset their values */
    for (let i = 0; i < inputElements.length; i++) {
      inputElements[i].type === 'radio' ?
      inputElements[i].checked = '' : inputElements[i].value = '';
    }
  }

  function onChange(e, key) {
    newHolding[key] = e.target.value;
  }

  return (
    <div style={inputStyles} className="transactionInputs block is-flex">
      <div>
        <label><b>Ticker</b></label>
        <input
          className="input is-small"
          type="text"
          id="TransactionInputTicker"
          onChange={(e) => onChange(e, 'ticker')}
        />
      </div>
      <div>
        <label><b>Shares Total</b></label>
        <input
          className="input is-small"
          type="text"
          id="TransactionInputStockTotal"
          onChange={(e) => onChange(e, 'stockTotal')}
        />
      </div>
      <div>
        <label><b>Average Cost Per Share</b></label>
        <input
          className="input is-small"
          type="text"
          id="TransactionInputStockTotal"
          onChange={(e) => onChange(e, 'avgCost')}
        />
      </div>
      <div>
        <label><b>Date</b></label>
        <input
          className="input is-small"
          type="date"
          id="TransactionInputStockTotal"
          onChange={(e) => onChange(e, 'transactionDate')}
        />
      </div>
      <div className="control">
        <label><b>Order Type</b></label>
        <div className="my-2">
        <label className="radio">
          <input
            type="radio"
            name="orderType"
            className="is-small mr-2"
            value="buy"
            onChange={(e) => onChange(e, 'orderType')}
          />
            Buy
        </label>
        <label className="radio">
          <input
            type="radio"
            name="orderType"
            className="is-small mr-2"
            value="sell"
            onChange={(e) => onChange(e, 'orderType')}  
          />
            Sell
        </label>
        </div>
      </div>
      <div>
        <button
          className="button is-success"
          onClick={(e) => handleClick(e)}
        >
          Add Holding
        </button>
      </div>
    </div>
  )
}

export default TransactionInput;