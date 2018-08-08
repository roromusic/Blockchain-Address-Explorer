import React from 'react';
import './Summary.css';

const Summary = ({id, n_tx, finalBalance, isSatoshi, toggleCurrency}) => {
  return (
    <div className='summary'>
      <div className='currency'>
        <div>Satoshi</div>
        <div 
          className='currency_switch'
          onClick={toggleCurrency}
        >
          <div 
            className='currency_selection'
            style={{
              float: isSatoshi ? 'left' : 'right'
            }}
          >
          </div>
        </div>
        <div>USD</div>
      </div>
      <h3>Account Summary</h3>
      <dl className='summary_table'>
        <dt>Address</dt>
        <dd>{id}</dd>
        <dt>Transactions</dt>
        <dd>{n_tx}</dd>
        <dt>Final Balance</dt>
        <dd>{finalBalance}</dd>
      </dl>
    </div>
  )
}

export default Summary;