function HoldingBoard(props) {
  const holdingStyles = {
    display: 'inline-flex',
    flexDirection: 'column',
    borderRadius: '.5em',
  }
  return (
    <div className="block">
      <h3 className="title">Holdings</h3>
      <div className="holdings has-text-white is-flex is-justify-content-space-around">
      {
        props.holdings.map(holding => (
          <div style={holdingStyles} className="has-background-primary-dark px-5 py-3" key={holding.ticker}>
            <div className="is-size-4 has-text-weight-bold">{holding.ticker}</div>
            <div><b>Total Stock</b>: {holding.stock_total}</div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default HoldingBoard;