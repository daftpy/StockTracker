function TickerInfoModal(props) {
  let activeStyle = {};
  props.visibility ? activeStyle = {display: 'flex'} : activeStyle = {display: 'none'};
  return (
    <div id="TickerInfoModal" className="modal" style={activeStyle}>
      <div className="modal-background"></div>

      <div className="modal-content p-0 mt-6">
        <div className="box">
          <h5 className="is-size-5">{props.ticker}</h5>
        </div>
      </div>
      <button className="modal-close is-large" onClick={props.toggleModal} aria-label="close"></button>
    </div>
  )
}

export default TickerInfoModal;