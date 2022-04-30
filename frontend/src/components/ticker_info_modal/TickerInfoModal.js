import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import TransactionTable from '../transaction_board/TransactionTable';

import axios from 'axios';

function TickerInfoModal(props) {
  let activeStyle = {};
  props.visibility ? activeStyle = {display: 'flex'} : activeStyle = {display: 'none'};
  const [tickerDetails, setDetails] = useState('');
  const [chartData, setData] = useState({
    options: {
      chart: {
        id: "basic-line",
        width: '100%',
        toolbar: {
          show: false
        },
        zoom: {
          enable: false
        }
      },
      xaxis: {
        type: 'datetime',
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
    },
    series: [
      {
        name: "close-price",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]  
  });

  const transactions = [];
  props.transactions.forEach(transaction => {
    if (transaction.ticker == props.ticker) transactions.push(transaction);
  })

  function getTickerInfo(ticker) {
    if (ticker) {
      axios.get(`http://localhost:8000/daily_price/${ticker}/`)
      .then(res => {
        if (res.status === 200) {
          let newChart = Object.assign({}, chartData);
          let labels = [];
          let prices = [];
          res.data.forEach(function(obj) {
            labels.push(obj.trade_date);
            prices.push(obj.close_price);
          })
          labels = labels.reverse()
          prices = prices.reverse()
          labels = labels.slice(Math.max(prices.length - 30, 0));
          prices = prices.slice(Math.max(prices.length - 30, 0));
          let points = []
          console.log(transactions);
          transactions.forEach(transaction => {
            if (labels.includes(transaction.transactionDate)) points.push({
              x: new Date(transaction.transactionDate).getTime(),
              y: transaction.avgCost,
              marker: {
                size: 6,
                fillColor: '#fff',
                strokeColor: (transaction.orderType == 'BUY' ? '#35AC5E' : 'red'),
                radius: 1,
              },
              label: {
                borderColor: (transaction.orderType == 'BUY' ? '#35AC5En' : 'red'),
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: (transaction.orderType == 'BUY' ? '#35AC5E' : 'red'),
                },
          
                text: transaction.orderType,
              }
            })
          })
          console.log('points', points)
          newChart = {
            options: {
              annotations: {
                points: points
              },
              chart: {
                id: "basic-line",
                width: '100%',
                toolbar: {
                  show: false
                },
                zoom: {
                  enable: false
                }
              },
              xaxis: { // get the last 30 labels
                type: 'datetime',
                categories: labels
              },
            },
            series: [
              {
                name: "close-price",
                // get the last 30 days of pricing data
                data: prices
              }
            ],    
          }
          // update the chart state
          setData(newChart);
        }
      })

      axios.get(`http://localhost:8000/ticker_details/${ticker}/`)
      .then(res => {
        if (res.status === 200) {
          setDetails(res.data['details'])
        }
      })
    }
  }

  useEffect(() => {
    getTickerInfo(props.ticker);
  }, [props.ticker])

  return (
    <div id="TickerInfoModal" className="modal" style={activeStyle}>
      <div className="modal-background"></div>

      <div className="modal-content p-0 mt-6">
        <div className="box">
          <div className="block">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
            />
          </div>
          <h5 className="has-text-weight-bold is-size-5">{props.ticker}</h5>
          <div className="block is-size-7">{tickerDetails}</div>
          <TransactionTable
            transactions={transactions}
            filteredTransactions={[]}
          />
        </div>
      </div>
      <button className="modal-close is-large" onClick={props.toggleModal} aria-label="close"></button>
    </div>
  )
}

export default TickerInfoModal;