import './/styles/TransactionTable.css';

function TransactionRow (props) {
  const rowStyles = {
    display: 'inline-flex',
    width: '100%',
    justifyContent : 'space-between',
    listStyleType: 'none',
    alignItems: 'center',
  }
  function onClick(e, id) {
    props.removeTransaction(id)
  }
  return (
    <li className="transactionData block p-3 is-size-7" style={rowStyles}>
      <span className="transactionTicker">
        <span className="has-text-weight-bold">
          Ticker:
        </span> {props.transaction['ticker']}
      </span>
      <span className="transactionStockTotal">
        <span className="has-text-weight-bold">
          Total:
        </span> {props.transaction['stockTotal']}
      </span>
      <span className="transactionAvgCost">
        <span className="has-text-weight-bold">
          Avg Cost:
        </span> {props.transaction['avgCost']}
      </span>
      <span className="transactionDate">
        <span className="has-text-weight-bold">
          Transaction Date:
        </span> {props.transaction['transactionDate']}
      </span>
      <span className="transactionOrderType">
        <span className="has-text-weight-bold">
          Order Type:
        </span> {props.transaction['orderType']}
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
      <h4 className="is-size-4">Transactions</h4>
        <ul style={{marginLeft: '0'}}>
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