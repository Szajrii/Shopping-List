import React from 'react';

import DetailsLabel from '../components/DetailsLabel'

export default (props) => {
    return (
        <div className="modal" tabIndex="-1" role="dialog" id="detailsModal">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header bgcolor-orangered-051">
                        <h5 className="modal-title">{props.titleModal}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.dismiss}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br/>
                    </div>
                    <div className="modal-body">
                        {props.list.map((l, index) => <DetailsLabel name={l.name} amount={l.amount} key={'detailslabel' + index}/>)}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.dismiss}>Close</button>
                        {props.status === 'active' && <button type="button" className="btn btn-success" onClick={ () => props.markAsDone(props.titleModal)}>Mark as done</button>}
                    </div>
                </div>
            </div>
        </div>
    )
};
