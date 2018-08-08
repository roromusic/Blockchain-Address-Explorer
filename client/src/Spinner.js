import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className='spinner-outer'>
      <div className='spinner'>
        <div className='spinner_largeBox'>
        </div>
        <div className='spinner_smallBox'>
        </div>
      </div>
    </div>
  );
};

export default Spinner;