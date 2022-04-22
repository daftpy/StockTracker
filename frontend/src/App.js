import { useEffect, useState } from 'react';
import getCookie from './helpers/getCookie';
import getTransactionData from './helpers/getTransactionData';
import axios from 'axios';
import TransactionBoard from './components/transaction_board/TransactionBoard';
import './App.css';

function App() {
  const [transactionsList, setTransactions] = useState([])

  useEffect(() => {
    const transactions = transactionsList.slice();
    axios.get(`http://localhost:8000/transactions/`)
      .then(res => {
        let results = res.data.results;
        if (res.status === 200) {
          console.log(res.data.results)
          let newTransactions = getTransactionData(results);
          setTransactions([].concat(transactions, newTransactions));
        }
      })
    },
    []
  );

  function removeTransaction(id) {
    let transactions = transactionsList.slice();
    // https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
    let removeTransaction = transactions.map(
      transaction => transaction.id
    ).indexOf(id);
    ~removeTransaction && transactions.splice(removeTransaction, 1);
    axios.delete(`http://localhost:8000/transactions/${id}/`)
      .then(res => {
        setTransactions(transactions);
      })
  }

  return (
    <div className="App">
      <div className="content my-2 mx-6">
        <TransactionBoard
          transactions={transactionsList}
          setTransactions={setTransactions}
          removeTransaction={removeTransaction}
        />
      </div>
    </div>
  );
}

export default App;
