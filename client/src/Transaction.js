import React from 'react';
import './Transaction.css';

const Transaction = ({item, details}) => {

  return (
    <li>
      {item}
      {details}
    </li>
  );
}

export default Transaction;