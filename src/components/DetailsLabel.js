import React from 'react';

export default (props) => {
    return (
        <div className='details-label'>
            <span>{props.name}</span>
            <b><span>{props.amount}</span></b>
        </div>
    )
}
