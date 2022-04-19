function getTransactionData(results) {
  let transactions = []
  for (let i = 0; i < results.length; i++) {
    transactions.push({
      'ticker': results[i]['ticker'],
      'stockTotal': results[i]['stock_quantity'],
      'avgCost': results[i]['avg_cost'],
      'transactionDate': results[i]['trade_date'],
      'orderType': results[i]['order_type'],
      'id': results[i]['id']
    })
  }
  return transactions;
}

export default getTransactionData;