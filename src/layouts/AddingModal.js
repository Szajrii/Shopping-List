import React from 'react';
import ModalInput from '../components/ModalInput';
import Button from '../components/Button';

export default class AddingModal extends React.Component {

    state = {
        title: '',
        ingredients: [
            {name: '', amount: ''}
        ]
    };

    addItem = () => {
        this.setState(prevState => {
            const newArr = [...prevState.ingredients, {name: '', amount: ''}];
            return ({
                ingredients: newArr
            })
        })
    };

    handleNameChange = (e, id) => {
        const eventValue = e.target.value;
        this.setState(prevState => {
            const newArr = [...prevState.ingredients];
            newArr[id].name = eventValue;
            return ({
                ingredients: newArr
            })
        })
    };

    handleAmountChange = (e, id) => {
        const eventValue = e.target.value;
        this.setState(prevState => {
            const newArr = [...prevState.ingredients];
            newArr[id].amount = eventValue;
            return ({
                ingredients: newArr
            })
        })
    };

    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog" id="addingModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add list item</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text color-orangered">Title</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Sizing example input"/>
                            </div>
                            {/*onchange value and clicks*/}
                            {this.state.ingredients.map((i, index) => <ModalInput
                                id={index}
                                key={"modalinput" + index}
                                nameChange={this.handleNameChange}
                                nameValue={this.state.ingredients[index].name}
                                amountChange={this.handleAmountChange}
                                amountValue={this.state.ingredients[index].amount}
                            />)}
                            <Button width="150px" text="Add item" classNames="btn btn-outline-primary" click={this.addItem}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary bgcolor-orangered">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
