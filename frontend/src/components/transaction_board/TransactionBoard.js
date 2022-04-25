import axios from 'axios';
import { useEffect, useState } from 'react';

import TransactionTable from './TransactionTable';
import TransactionInput from './TransactionInput';
import EditModalWrapper from '../edit_transaction_modal/EditModalWrapper';

function TransactionBoard(props) {
  const [modalVisibility, setVisibility] = useState(false);
  const [inputErrors, setErrors] = useState({});
  const [targetTransaction, setTarget] = useState({});

  function toggleModal(transaction) {
    setVisibility(!modalVisibility);
    if (transaction) {
      setTarget(transaction);
    }
    setErrors({});
  }

  async function addTransaction(transaction) {
    /* Clone the state before modifying */
    const transactions = props.transactions.slice();
    /* 
      Post the input to the transactions endpoint. If the post request is succesful,
      add the new transaction to the cloned array and set the transactions state.
    */
    let success = false;
    await axios.post(`http://localhost:8000/transactions/`, {
      "ticker": transaction['ticker'],
      "stock_quantity": transaction['stockTotal'],
      "avg_cost": transaction['avgCost'],
      'trade_date': transaction['transactionDate'],
      'order_type': transaction['orderType']
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
        success = true;
      }
    })
    .catch((error) => {
      console.log(error.response.data)
      error.response.data ? setErrors(error.response.data) : console.log('unexpected');
    })
    return success;
  }

  async function editTransaction(transaction) {
    // Clone the state before modifying
    const transactions = props.transactions.slice();

    let success = false;
    await axios.put(`http://localhost:8000/transactions/${transaction['id']}/`, {
      'id': transaction['id'],
      'ticker': transaction['ticker'],
      'stock_quantity': transaction['stockTotal'],
      'avg_cost': transaction['avgCost'],
      'trade_date': transaction['transactionDate'],
      'order_type': transaction['orderType']
    })
    .then(res => {
      if (res.status === 200) {
        toggleModal();
        let updatedTransactions = transactions.map(
          obj => obj['id'] === transaction['id'] ? transaction : obj
        )
        props.setTransactions(updatedTransactions);
      }
    })
  }

  function removeTransaction(id) {
    let transactions = props.transactions.slice();
    // https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
    let removeTransaction = transactions.map(
      transaction => transaction.id
    ).indexOf(id);
    ~removeTransaction && transactions.splice(removeTransaction, 1);
    axios.delete(`http://localhost:8000/transactions/${id}/`)
      .then(res => {
        props.setTransactions(transactions);
      })
  }

  return (
    <div>
      <EditModalWrapper
        transaction={targetTransaction}
        inputErrors={inputErrors}
        editTransaction={editTransaction}
        visibility={modalVisibility}
        toggleModal={toggleModal}
      />
      <TransactionTable
        transactions={props.transactions}
        removeTransaction={removeTransaction}
        filteredTickers={props.filteredTickers}
        filteredTransactions={props.filteredTransactions}
        toggleModal={toggleModal}
        modalVisibility={modalVisibility}
      />
      <TransactionInput
        formAction={addTransaction}
        inputErrors={inputErrors}
      />
    </div>
  )
}

export default TransactionBoard;