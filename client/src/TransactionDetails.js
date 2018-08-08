import React from 'react';
import './TransactionDetails.css';

const TransactionDetails = (
  {
    txID, 
    inputs,
    outputs,
    weight,
    size,
    displaySatoshi,
    expanded,
    toUSD
  }
) => {
  let totalInput = 0;
  let totalOutput = 0;

  return (
    <div 
      className='transaction_details'
      style={{display: expanded.has(txID) ? 'block' : 'none'}}
    >
      <div className='transaction_IO'>
        <div className='transaction_inputs'>
          <h3>Inputs</h3>
          <ul className='transaction_IO-list'>
            {inputs.map((input, index) => {
              totalInput += input.value;

              return (
              <li className='transaction_IO-item' key={index + input.value + input.addr}>
                <div className='transaction_input'>{input.addr}</div>
                <div className='transaction_IO-value'>{displaySatoshi ? input.value : toUSD(input.value)}</div>
              </li>
              );
            })
            }
          </ul>
          <div className='transaction_input-total'>{`Input Total: ${displaySatoshi ? totalInput : toUSD(totalInput)}`}</div>
        </div>
        <div className='transaction_outputs'>
          <h3>Outputs</h3>
          <ul className='transaction_IO-list'>
            {outputs.map((output, index) => {
              totalOutput += output.value;

              return (
                <li className='transaction_IO-item' key={index + output.value + output.addr}>
                  <div className='transaction_output'>{output.addr}</div>
                  <div className='transaction_IO-value'>
                    {displaySatoshi ? output.value : toUSD(output.value)}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='transaction_output-total'>
            {`Output Total: ${displaySatoshi ? totalOutput : toUSD(totalOutput)}`}
          </div>
        </div>
      </div>
      <div className='transaction_misc'>
      <h3>Details</h3>
      <dl className='transaction_table'>
        <dt>Fees</dt>
        <dd>{toUSD(totalInput - totalOutput)}</dd>
        <dt>Size</dt>
        <dd>{size}</dd>
        <dt>Weight</dt>
        <dd>{weight}</dd>
      </dl>
      </div>
    </div>
  );
}

export default TransactionDetails;