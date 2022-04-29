import EditTransactionModal from './EditTransactionModal';

function EditModalWrapper(props) {
  const visibility = props.visibility;
  if (visibility && props.transaction) {
    return (
      <EditTransactionModal
        transaction={props.transaction}
        inputErrors={props.inputErrors}
        editTransaction={props.editTransaction}
        visibility={true}
        toggleModal={props.toggleModal}
      />
    )
  } else {
    return;
  }
}

export default EditModalWrapper;