import React from 'react';

const TransactionItem = (
  {
    id, 
    date, 
    txID, 
    inputs, 
    outputs,
    displaySatoshi,
    toUSD, 
    toggleDetails
  }) => {

  let sum = 0;
  inputs.forEach(input => {
    if(input.addr === id) sum -= input.value;
  });
  outputs.forEach(output => {
    if(output.addr === id) sum += output.value;
  });

  return (
    <div 
      className='transaction_item'
      onClick={() => toggleDetails(txID)}
    >
      <div className='transaction_date'>{new Date(date * 1000).toDateString().slice(4)}</div>
      <div className='transaction_id'>{`Tx ID: ${txID}`}</div>
      <div 
        className='transaction_sum'
        style={{color: sum >= 0 ? '#1DB954' : 'red'}}
      >{displaySatoshi ? sum : toUSD(sum)}</div>
    </div>
  );
}

export default TransactionItem;