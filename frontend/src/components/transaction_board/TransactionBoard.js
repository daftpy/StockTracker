import { useEffect, useState } from 'react';

import TransactionTable from './TransactionTable';
import TransactionInput from './TransactionInput';
import EditModalWrapper from '../edit_transaction_modal/EditModalWrapper';

function TransactionBoard(props) {
  const [modalVisibility, setVisibility] = useState(false);

  function toggleModal() {
    setVisibility(!modalVisibility);
  }

  return (
    <div>
      <EditModalWrapper visibility={modalVisibility} toggleModal={toggleModal} />
      <TransactionTable
        transactions={props.transactions}
        removeTransaction={props.removeTransaction}
        toggleModal={toggleModal}
        modalVisibility={modalVisibility}
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