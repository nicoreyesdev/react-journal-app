import React from 'react';
import { SpinnerInfinity } from 'spinners-react';

export const LoadingPage = () => {
  return (
    <div className='loading'>
        <SpinnerInfinity color="#fff" size="100px"/>
        <h1 className='loading-title'>Loading...</h1>
    </div>
  )
};
