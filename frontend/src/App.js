import { useEffect, useState } from 'react';
import getTransactionData from './helpers/getTransactionData';
import axios from 'axios';
import TransactionBoard from './components/transaction_board/TransactionBoard';
import HoldingBoard from './components/holding_board/HoldingBoard';
import './App.css';

function App() {
  const [transactionsList, setTransactions] = useState([])
  const [holdings, setHoldings] = useState([])
  const [filteredTickers, setFilteredTickers] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])

  useEffect(() => {
    const transactions = transactionsList.slice();
    axios.get(`http://localhost:8000/transactions/`)
      .then(res => {
        let results = res.data.results;
        if (res.status === 200 && results.length > 0) {
          // console.log(res)
          let newTransactions = getTransactionData(results);
          setTransactions([].concat(transactions, newTransactions));
        }
      })
  },
  []
  );

  useEffect(() => {
    // only get holdings if we load transactions
    if (transactionsList.length > 0) {
      axios.get('http://localhost:8000/holdings/')
      .then(res => {
        let results = res.data
        if (res.status === 200) {
          setHoldings(results)
        }
      }) 
    }
  },
  [transactionsList]
  )

  useEffect(() => {
    filterTransactions();
  },[filteredTickers])

  function filterTransactions() {
    setFilteredTransactions([]);
    let filters = []
    console.log(filteredTickers)
    transactionsList.forEach(transaction => {
      if (filteredTickers.includes(transaction.ticker)) filters.push(transaction);
    })
    setFilteredTransactions(filters);
  }

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
        <HoldingBoard
          holdings={holdings}
          setFilteredTickers={setFilteredTickers}
          filteredTickers={filteredTickers}
          filterTransactions={filterTransactions}
        />
        <TransactionBoard
          transactions={transactionsList}
          setTransactions={setTransactions}
          removeTransaction={removeTransaction}
          filteredTickers={filteredTickers}
          filteredTransactions={filteredTransactions}
        />
      </div>
    </div>
  );
}

export default App;
