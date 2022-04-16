import { useEffect, useState } from 'react';
import TransactionBoard from './components/transaction_board/TransactionBoard';
import './App.css';

function App() {
  const [holdingsTotal, setHoldings] = useState({});
  const [transactionsList, setTransactions] = useState([])

  useEffect(() => {
    console.log('Affected')
  })

  return (
    <div className="App">
      <div className="content my-2 mx-6">
        <TransactionBoard
          transactions={transactionsList}
          holdings={holdingsTotal}
          setTransactions={setTransactions}
          setHoldings={setHoldings}
        />
      </div>
    </div>
  );
}

export default App;
