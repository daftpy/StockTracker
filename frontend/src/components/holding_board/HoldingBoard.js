import './/styles/HoldingBoard.css'

function HoldingBoard(props) {
  function totalValue(holdings) {
    let value = 0;
    if (holdings) {
      value = holdings.map(holding => holding.value).reduce((prev, curr) => prev + curr, 0);
    }
    return value.toFixed(2);
  }
  const totalPortfolioValue = totalValue(props.holdings)
  return (
    <div className="block">
      <h3 className="title">Holdings</h3>
      <div className="block"><b>Total Portfiolio Value</b>: ${totalPortfolioValue}</div>
      <div className="holdings has-text-white is-flex is-justify-content-space-around">
      {Object.keys(props.holdings).length > 0 &&
        props.holdings.map(holding => (
          <div className="holding" key={holding.ticker}>
            <div className="holdingWrapper has-background-grey-dark px-5 py-3">
              <div className="is-size-4 has-text-weight-bold">{holding.ticker}</div>
              <div><b>Total Stock</b>: {holding.stock_total}</div>
              <div><b>Value</b>: ${holding.value.toFixed(2)}</div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default HoldingBoard;