import React from 'react';
import $ from 'jquery';
import {NavLink} from 'react-router-dom';
import ShoppingList from '../layouts/ShoppingList';
import Button from '../components/Button';
import AddingModal from  '../layouts/AddingModal'

export default class Application extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: {
                fullList: ["Urodziny", "Pizza", "Obiad", "Lody"],
                listToDisplay: []
            },
            showModalForAdding: false,
            showModalForItemDetails: false
        }
    }

    handleClickForAddingModal = () => {
        this.setState({
            showModalForAdding: true
        })
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.showModalForAdding) {
            $('#addingModal').modal('show')
        }
    }

    render() {
        return (
            <div className="application">
                <nav className="navbar application-nav">
                    <NavLink className="navbar-brand" to="/">
                        Shopping List
                    </NavLink>
                </nav>
                <div className="application-list">
                    <div className="application-list-tab">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link active color-orangered" to="/">Active</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link color-orangered" to="/">Link</NavLink>
                            </li>
                        </ul>
                    </div>
                    <ShoppingList list={this.state.list.fullList}/>
                </div>
                <div className="application-additem">
                    <Button classNames="btn btn-outline-info" width="150px" text="Add Item" click={this.handleClickForAddingModal}/>
                </div>
                <AddingModal />
            </div>
        )
    }
}
