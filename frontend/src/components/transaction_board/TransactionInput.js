import axios from 'axios';
import { useState } from 'react';
import './/styles/TransactionInput.css';

function TransactionInput(props) {
  /*
    newHolding will hold the value of the inputElements. When the user hits submit, 
    the values are sent to the python server, validated, saved, and returns a 
    validation response.
  */
  const [inputErrors, setErrors] = useState({});
  const newHolding = {};
  const inputStyles = {
    justifyContent : 'space-between',
    alignItems: 'center',
    width: '100%'
  }
  const inputElements = document.getElementsByTagName('input');

  function handleClick(e) {
    e.preventDefault();
    /* Clone the state before modifying */
    const holdings = Object.assign({}, props.holdings);
    const transactions = props.transactions.slice();
    /* 
      Post the input to the transactions endpoint. If the post request is succesful,
      add the new transaction to the cloned array and set the transactions state.
    */
    axios.post(`http://localhost:8000/transactions/`, {
      "ticker": newHolding['ticker'],
      "stock_quantity": newHolding['stockTotal'],
      "avg_cost": newHolding['avgCost'],
      'trade_date': newHolding['transactionDate'],
      'order_type': newHolding['orderType']
    })
    .then(res => {
      if (res.status === 201) {
        transactions.push({
          'id': res.data['id'],
          'ticker': res.data['ticker'],
          'stockTotal': res.data['stock_quantity'],
          'avgCost': res.data['avg_cost'],
          'transactionDate': res.data['trade_date'],
          'orderType': res.data['order_type']
        });
        props.setTransactions(transactions);
        setErrors({});
      }
    })
    .catch((error) => {
      console.log(error.response.data)
      error.response.data ? setErrors(error.response.data) : console.log('unexpected');
    })
    
    /* Set the holdings data, wip */
    holdings[newHolding["ticker"]] = newHolding["stockTotal"];
    props.setHoldings(holdings);
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
    <div>
      <div
        className="inputErrors block"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}>
        {Object.keys(inputErrors).map(function(key) {
          return <span className="tag is-danger is-rounded is-size-7 my-1">{key} {inputErrors[key]}</span> 
        })}
      </div>
      <div style={inputStyles} className="transactionInputs block is-size-7 is-flex">
        <div className="transactionInput block">
          <label><b>Ticker</b></label>
          <input
            className="input is-small"
            type="text"
            id="TransactionInputTicker"
            onChange={(e) => onChange(e, 'ticker')}
          />
        </div>
        <div className="transactionInput block">
          <label><b>Shares Total</b></label>
          <input
            className="input is-small"
            type="text"
            id="TransactionInputStockTotal"
            onChange={(e) => onChange(e, 'stockTotal')}
          />
        </div>
        <div className="transactionInput block">
          <label><b>Average Cost Per Share</b></label>
          <input
            className="input is-small"
            type="text"
            id="TransactionInputAvgCost"
            onChange={(e) => onChange(e, 'avgCost')}
          />
        </div>
        <div className="transactionInput block">
          <label><b>Date</b></label>
          <input
            className="input is-small"
            type="date"
            id="TransactionInputTransactionDate"
            onChange={(e) => onChange(e, 'transactionDate')}
          />
        </div>
        <div className="control transactionInput block">
          <label>
            <span className="has-text-weight-bold is-size-7">
              Order Type
            </span>
          </label>
          <div className="my-2">
          <label className="radio">
            <input
              type="radio"
              name="orderType"
              className="is-small mr-2"
              value="BUY"
              id="TransactionInputBuy"
              onChange={(e) => onChange(e, 'orderType')}
            />
              <span className="is-size-7">Buy</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="orderType"
              className="is-small mr-2"
              value="SELL"
              id="TransactionInputSell"
              onChange={(e) => onChange(e, 'orderType')}  
            />
              <span className="is-size-7">Sell</span>
          </label>
          </div>
        </div>
        <div className="transactionInput block">
          <button
            className="button is-success is-rounded is-small"
            id="submit"
            onClick={(e) => handleClick(e)}
          >
            Add Holding
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionInput;