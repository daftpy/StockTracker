import EditTransactionModal from './EditTransactionModal';

function EditModalWrapper(props) {
  const visibility = props.visibility;
  if (visibility) {
    return (<EditTransactionModal visibility={true} toggleModal={props.toggleModal}/>)
  } else {
    return (<EditTransactionModal visibility={false} toggleModal={props.toggleModal}/>)
  }
}

export default EditModalWrapper;