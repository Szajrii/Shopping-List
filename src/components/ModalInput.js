import React from 'react';

export default (props) => {
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Item name" value={props.nameValue} onChange={(e) => props.nameChange(e, props.id)}/>
            <input type="text" className="form-control" placeholder="Amount" value={props.amountValue} onChange={(e) => props.amountChange(e, props.id)}/>
                <div className="input-group-append">
                    <button className="btn btn-orangered-outlined" type="button"><i className="far fa-times-circle" onClick={props.click}/></button>
                </div>
        </div>
    )
}
