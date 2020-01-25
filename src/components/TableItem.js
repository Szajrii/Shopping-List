import React from 'react';

export default (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td><i className="fas fa-info-circle" title="Show details"/></td>
            <td><i className="far fa-trash-alt" title="Remove item"/></td>
        </tr>
    )
}
