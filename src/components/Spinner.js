import React from 'react';
import Loading from '../assets/Spinner.gif';

const Spinner = () => {
  return (
    <div className='flex items-center justify-center min-h-[60vh] w-full'>
      <img src={Loading} alt="loading..." />
    </div>
  );
}

export default Spinner;
