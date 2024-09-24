import React from 'react'
import Loading from '../assets/Spinner.gif'

const Spinner = ()=>{
    return (
      <div className='flex justify-center'>
        <img src={Loading} alt="loading..." />
      </div>
    )
}


export default Spinner;