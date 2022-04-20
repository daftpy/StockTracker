import { useEffect, useState } from 'react';

import TransactionTable from './TransactionTable';
import TransactionInput from './TransactionInput';

function TransactionBoard(props) {
  const [modalVisibility, setVisibility] = useState(false);
  const editModal = document.querySelector("#editTransactionModal");
  function toggleModal() {
    setVisibility(!modalVisibility)
    modalVisibility ? editModal.classList.add('is-active') : editModal.classList.remove('is-active');
  }
  return (
    <div>
      <div id="editTransactionModal" className="modal">
        <div className="modal-background"></div>

        <div className="modal-content">
          <div className="box">
            <h5 className="is-size-5">Edit Transaction</h5>
            <TransactionInput />
          </div>
        </div>
          <button className="modal-close is-large" onClick={toggleModal} aria-label="close"></button>
      </div>
      <TransactionTable
        transactions={props.transactions}
        removeTransaction={props.removeTransaction}
        toggleModal={toggleModal}
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