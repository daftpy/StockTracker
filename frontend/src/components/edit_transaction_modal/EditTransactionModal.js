import TransactionInput from "../transaction_board/TransactionInput";
import './/styles/EditTransactionModal.css';

function EditTransactionModal(props) {
  let activeStyle = {};
  props.visibility ? activeStyle = {display: 'flex'} : activeStyle = {display: 'none'};
  return (
    <div id="editTransactionModal" className="modal" style={activeStyle}>
    <div className="modal-background"></div>

    <div className="modal-content p-0 mt-6">
      <div className="box">
        <h5 className="is-size-5">Edit Transaction</h5>
        <TransactionInput />
      </div>
    </div>
    <button className="modal-close is-large" onClick={props.toggleModal} aria-label="close"></button>
    </div>
  )
}

export default EditTransactionModal;