import React from 'react';
import './Transactions.css';

const Transactions = ({transactions, pagination}) => {
  return (
    <div className='transactions'>
      <h3>Transactions</h3>
      <ul>{transactions}</ul>
      {pagination}
    </div>
  );
}

export default Transactions;