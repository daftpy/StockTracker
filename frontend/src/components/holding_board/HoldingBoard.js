import './/styles/HoldingBoard.css'

function HoldingBoard(props) {
  function totalValue(holdings) {
    let value = 0;
    if (holdings) {
      /* holdings is a list of objects [{'ticker': ticker, 'value': value}]
      sum up the values and return them */
      value = holdings.map(holding => holding.value).reduce((prev, curr) => prev + curr, 0);
    }
    return value.toFixed(2);
  }
  const totalPortfolioValue = totalValue(props.holdings)

  function toggleActiveHolding(holdingTicker) {
    let currentFilter = props.filteredTickers.slice();
    let activeElement = document.getElementById(`${holdingTicker}`);
    if (activeElement.getAttribute('is-active') == 'true') {
      activeElement.setAttribute('is-active', false);
      activeElement.classList.remove('has-background-success')
      activeElement.classList.add('has-background-grey-dark')
      currentFilter = currentFilter.filter(ticker => ticker != holdingTicker)
      props.setFilteredTickers(currentFilter);
    } else {
      activeElement.classList.remove('has-background-grey-dark');
      activeElement.classList.add('has-background-success');
      activeElement.setAttribute('is-active', true);
      props.setFilteredTickers([].concat(currentFilter, [holdingTicker]))
    }
  }
  return (
    <div className="block">
      <h3 className="title">Holdings</h3>
      <div className="block"><b>Total Portfiolio Value</b>: ${totalPortfolioValue}</div>
      <div className="holdings has-text-white is-flex is-justify-content-space-around">
      {Object.keys(props.holdings).length > 0 &&
        props.holdings.map(holding => (
          <div className="holding" key={holding.ticker}>
            <div onClick={() => toggleActiveHolding(holding.ticker)} id={holding.ticker} is-active="false" className="holdingWrapper has-background-grey-dark px-5 py-3">
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