import React from 'react';
import loading from './Rhombus.gif'

const Spinner = ()=> {
        return (<div className='container m-10  d-flex h-100 justify-content-center align-items-center'>
            <img src={loading} alt="loading..." />
        </div>);
}

export default Spinner;