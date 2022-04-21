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
    <li className="transactionData p-3 is-size-7" style={rowStyles}>
      <span className="transactionTicker px-3">
        <span className="has-text-weight-bold">
          Ticker:
        </span> {props.transaction['ticker']}
      </span>
      <span className="transactionStockTotal px-3">
        <span className="has-text-weight-bold">
          Total:
        </span> {props.transaction['stockTotal']}
      </span>
      <span className="transactionAvgCost px-3">
        <span className="has-text-weight-bold">
          Avg Cost:
        </span> {props.transaction['avgCost']}
      </span>
      <span className="transactionDate px-3">
        <span className="has-text-weight-bold">
          Transaction Date:
        </span> {props.transaction['transactionDate']}
      </span>
      <span className="transactionOrderType px-3">
        <span className="has-text-weight-bold">
          Order Type:
        </span> {props.transaction['orderType']}
      </span>
      <span>
        <button
          id="deleteTransaction"
          onClick={(e) => onClick(e, props.transaction['id'])}
          className="button transactionDeleteButton p-2 m-1 is-danger is-rounded is-small"
          style={{lineHeight: '9px', height: '2em'}}
        >
          x
        </button>
        <button
          id="deleteTransaction"
          onClick={props.toggleModal}
          className="button transactionEditButton p-2 m-1 is-info is-rounded is-small"
          style={{lineHeight: '9px', height: '2em'}}
        >
          e
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
                toggleModal={props.toggleModal}
              />
            )
          })}
        </ul>
    </div>
  );
}

export default TransactionTable;