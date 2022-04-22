import EditTransactionModal from './EditTransactionModal';

function EditModalWrapper(props) {
  const visibility = props.visibility;
  if (visibility && props.transaction) {
    return (<EditTransactionModal transaction={props.transaction} inputErrors={props.inputErrors} visibility={true} toggleModal={props.toggleModal}/>)
  } else {
    return (<EditTransactionModal visibility={false} toggleModal={props.toggleModal}/>)
  }
}

export default EditModalWrapper;