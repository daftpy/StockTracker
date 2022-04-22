import axios from 'axios';
import { useEffect, useState } from 'react';
import './/styles/TransactionInput.css';

function TransactionInput(props) {
  /*
    inputData will hold the value of the inputElements. When the user hits submit, 
    the values are sent to the python server, validated, saved, and returns a 
    validation response.
  */
  const [inputData, setInputData] = useState({});
  const inputStyles = {
    justifyContent : 'space-between',
    alignItems: 'center',
    width: '100%'
  }

  async function handleClick(e) {
    e.preventDefault();
    let result = await props.formAction(inputData)
    // if the formAction is succesful, clear the inputs
    if (result === true) {
      console.log('clearing inputs');
      let inputElements = document.getElementsByTagName('input');
      for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].type === 'radio' ?
        inputElements[i].checked = '' : inputElements[i].value = '';
      }
    }
  }

  function onChange(e, key) {
    // Clone state before modifying.
    let newInput = Object.assign({}, inputData)
    newInput[key] = e.target.value
    setInputData(newInput)
  }

  useEffect(() => {
    let inputElements = {
      'ticker': document.querySelector('#TransactionInputTicker'),
      'stockTotal': document.querySelector('#TransactionInputStockTotal'),
      'avgCost': document.querySelector('#TransactionInputAvgCost'),
      'transactionDate': document.querySelector('#TransactionInputTransactionDate'),
    }
    /* If props.transaction exists, populate the input fields */
    if (props.transaction) {
      inputElements['ticker'].value = props.transaction['ticker'];
      inputElements['stockTotal'].value = props.transaction['stockTotal'];
      inputElements['avgCost'].value = props.transaction['avgCost'];
      inputElements['transactionDate'].value = props.transaction['transactionDate'];
      if (props.transaction['orderType'] === 'BUY') {
        document.querySelector('#TransactionInputBuy').checked = true
      } else {
        document.querySelector('#TransactionInputSell').checked = true
      }
      // And set the state
      setInputData({
        'ticker': props.transaction['ticker'],
        'stockTotal': props.transaction['stockTotal'],
        'avgCost': props.transaction['avgCost'],
        'transactionDate': props.transaction['transactionDate'],
        'orderType': props.transaction['orderType']
      })
    }
  },[props.transaction])

  return (
    <div>
      <div
        className="inputErrors block"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}>
        {props.inputErrors !== undefined &&
          Object.keys(props.inputErrors).map(function(key) {
          return <span key={key} className="tag is-danger is-rounded is-size-7 my-1">{key} {props.inputErrors[key]}</span> 
        })
        }
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