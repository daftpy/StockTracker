function TransactionRow (props) {
  const rowStyles = {
    display: 'inline-flex',
    width: '100%',
    justifyContent : 'space-between',
    listStyleType: 'none'
  }
  return (
    <li style={rowStyles} key={props.transaction['ticker']}>
      <span>
        Ticker: {props.transaction['ticker']}
      </span>
      <span>
        Total: {props.transaction['stockTotal']}
      </span>
      <span>
        Avg Cost: {props.transaction['avgCost']}
      </span>
      <span>
        Transaction Date: {props.transaction['transactionDate']}
      </span>
      <span>
        Order Type: {props.transaction['orderType']}
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
                key={transaction['ticker']}
                transaction={transaction}
              />
            )
          })}
        </ul>
    </div>
  );
}

export default TransactionTable;