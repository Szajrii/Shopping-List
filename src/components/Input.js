import React from 'react';

export default (props) => {
    return (
        <input
            type={props.type}
            value={props.value}
            onChange={props.handleChange}
            className="form-control"
            aria-describedby="emailHelp"
        />
    )
}
