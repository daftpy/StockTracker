function TransactionRow (props) {
  const rowStyles = {
    display: 'inline-flex',
    width: '100%',
    justifyContent : 'space-between',
    listStyleType: 'none'
  }
  function onClick(e, id) {
    props.removeTransaction(id)
  }
  return (
    <li className="transactionData" style={rowStyles}>
      <span className="transactionTicker">
        Ticker: {props.transaction['ticker']}
      </span>
      <span className="transactionStockTotal">
        Total: {props.transaction['stockTotal']}
      </span>
      <span className="transactionAvgCost">
        Avg Cost: {props.transaction['avgCost']}
      </span>
      <span className="transactionDate">
        Transaction Date: {props.transaction['transactionDate']}
      </span>
      <span className="transactionOrderType">
        Order Type: {props.transaction['orderType']}
      </span>
      <span>
        <button
          id="deleteTransaction"
          onClick={(e) => onClick(e, props.transaction['id'])}
          className="button is-danger is-rounded is-small"
        >
          Delete
        </button>
      </span>
    </li>
  );
}

function TransactionTable(props) {
  return (
    <div className="block">
      <h1 className="title">Transactions</h1>
        <ul>
          {props.transactions.map((transaction, i) => {
            return (
              <TransactionRow
                key={transaction['id']}
                transaction={transaction}
                removeTransaction={props.removeTransaction}
              />
            )
          })}
        </ul>
    </div>
  );
}

export default TransactionTable;