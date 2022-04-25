import TickerInfoModal from './TickerInfoModal';

function InfoModalWrapper(props) {
  const visibility = props.visibility;
  if (visibility) {
    return (
      <TickerInfoModal
        visibility={true}
        toggleModal={props.toggleModal}
        ticker={props.ticker}
      />
    )
  } else {
    return (<TickerInfoModal visibility={false} toggleModal={props.toggleModal}/>)
  }
}

export default InfoModalWrapper;