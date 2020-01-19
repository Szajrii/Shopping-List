import React from 'react';

export default (props) => {
    return (
        <button
            className={props.classNames}
            style={{"width": props.width? props.width: null}}
            onClick={props.click}
        >
            {props.text}
        </button>
    )
}
