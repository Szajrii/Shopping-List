import React from 'react';
import $ from 'jquery';
import {NavLink} from 'react-router-dom';
import ShoppingList from '../layouts/ShoppingList';
import Button from '../components/Button';
import AddingModal from  '../layouts/AddingModal'
import DetailsModal from  '../layouts/DetailsModal'
import ListHandler from "../utils/listHandler/ListHandler";

export default class Application extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: {
                fullList: [],
                sortedList: [],
                listToDisplay: {
                    title: '',
                    list: []
                }
            },
            showModalForAdding: false,
            showModalForItemDetails: false,
            listHandler: new ListHandler(this.props.location.state.email),
            activeTab: 'active'
        }
    }

    handleClickForAddingModal = () => {
        this.setState({
            showModalForAdding: true,
            showModalForItemDetails: false
        })
    };

    setListForDetails = (title) => {
        this.setState(prevState => ({
            list: {
                ...prevState.list,
                listToDisplay: prevState.list.fullList.find(l => l.title === title)
            },
            showModalForItemDetails: true,
            showModalForAdding: false
        }));
    };

    handleModalDismiss = () => {
        this.setState({
            showModalForItemDetails: false,
            showModalForAdding: false,
        })
    };

    updateList = () => {
        this.state.listHandler.downloadLists()
            .then(doc => {
                this.setState(prevState => ({
                    list: {
                        ...prevState.list,
                        fullList: doc.data().shoppingList,
                        sortedList: doc.data().shoppingList.filter(l => l.status === prevState.activeTab)
                    }
                }))
            })
            .catch(err => console.log(err));
    };

    markAsDone = name => {
        this.state.listHandler.markAsDone(name, () => {
            this.updateList();
            this.handleModalDismiss();
        });
    };

    removeList = name => {
        this.state.listHandler.removeList(name, () => {
            this.updateList();
            this.handleModalDismiss();
        });
    }

    handleTabChange = (e) => {
        const target = e.target.id;
        this.setState(prevState => ({
            list: {
                ...prevState.list,
                sortedList: prevState.list.fullList.filter(l => l.status === target)
            },
            activeTab: target
        }))
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.showModalForAdding) {
            $('#addingModal').modal('show')
        } else {
            $('#addingModal').modal('hide')
        }

        if (nextState.showModalForItemDetails) {
            $('#detailsModal').modal('show')
        } else {
            $('#detailsModal').modal('hide')
        }
    }

    componentDidMount() {
        this.updateList();
        $('#addingModal').on('hide.bs.modal', e => {
            this.setState({
                showModalForItemDetails: false,
                showModalForAdding: false,
            })
        });
        $('#detailsModal').on('hide.bs.modal', e => {
            this.setState({
                showModalForItemDetails: false,
                showModalForAdding: false,
            })
        });
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
                            <li className="nav-item pointer">
                                <span className={"nav-link color-orangered " + (this.state.activeTab === 'active' ? "active" : '')} id="active" onClick={this.handleTabChange}>Active</span>
                            </li>
                            <li className="nav-item pointer">
                                <span className={"nav-link color-orangered " + (this.state.activeTab === 'done' ? "active" : '')} id="done" onClick={this.handleTabChange}>Done</span>
                            </li>
                        </ul>
                    </div>
                    <ShoppingList list={this.state.list.sortedList} showDetails={this.setListForDetails} remove={this.removeList}/>
                </div>
                <div className="application-additem">
                    <Button classNames="btn btn-outline-info" width="150px" text="Add List" click={this.handleClickForAddingModal}/>
                </div>
                <AddingModal addingHandler={this.state.listHandler.uploadList} updateList={this.updateList} dismiss={this.handleModalDismiss}/>
                <DetailsModal titleModal={this.state.list.listToDisplay.title} list={this.state.list.listToDisplay.list} status={this.state.list.listToDisplay.status} dismiss={this.handleModalDismiss} markAsDone={this.markAsDone}/>
            </div>
        )
    }
}
