import React from 'react';
import TableItem from "../components/TableItem";

export default (props) => {
    return (
        <div className="application-list-content">
            <table className="table table-borderless">
                <tbody>
                {props.list.map((item, index) => <TableItem name={item.title} key={'tableItem' + index} detailsClick={props.showDetails} remove={props.remove}/>)}
                </tbody>
            </table>
        </div>
    )
}
