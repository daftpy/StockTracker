function HoldingBoard(props) {
  return (
    <div className="block">
      <h3 className="title">Holdings</h3>
      {
        props.holdings.map(holding => (
          <div className="block" key={holding.ticker}><b>{holding.ticker}</b>: {holding.stock_total}</div>
        ))
      }
    </div>
  )
}

export default HoldingBoard;