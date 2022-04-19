import TransactionTable from './TransactionTable';
import TransactionInput from './TransactionInput';

function TransactionBoard(props) {
  return (
    <div>
      <TransactionTable
        transactions={props.transactions}
        removeTransaction={props.removeTransaction}
      />
      <TransactionInput
        holdings={props.holdings}
        transactions={props.transactions}
        setTransactions={props.setTransactions}
        setHoldings={props.setHoldings}
      />
    </div>
  )
}

export default TransactionBoard;