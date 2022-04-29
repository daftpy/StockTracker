import TickerInfoModal from './TickerInfoModal';

function InfoModalWrapper(props) {
  const visibility = props.visibility;
  if (visibility) {
    return (
      <TickerInfoModal
        visibility={true}
        toggleModal={props.toggleModal}
        ticker={props.ticker}
        transactions={props.transactions}
      />
    )
  } else {
    return;
  }
}

export default InfoModalWrapper;