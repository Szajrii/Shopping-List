import React from 'react';
import ModalInput from '../components/ModalInput';
import Button from '../components/Button';

export default class AddingModal extends React.Component {

    state = {
        title: '',
        ingredients: [
            {name: '', amount: ''}
        ],
        validationError: false
    };

    addItem = () => {
        this.setState(prevState => {
            const newArr = [...prevState.ingredients, {name: '', amount: ''}];
            return ({
                ingredients: newArr
            })
        })
    };

    handleTitleChange = e => {
        const eventValue = e.target.value;
        this.setState({
            title: eventValue
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

    dismissValidationError = () => {
        setTimeout( () => {
            this.setState({
                validationError: false
            });
        }, 5000)
    };

    fieldAreValid = () => {
        const fields = this.state.ingredients;
        const nameEmpty = fields.some(f => f.name === "");
        const amountEmpty = fields.some(f => f.amount === "");
        const titleEmpty = this.state.title === '';

        if (titleEmpty) {
            this.setState({
                validationError: true
            });
            this.dismissValidationError();
            return false;
        }

        if (nameEmpty) {
            this.setState({
                validationError: true
            });
            this.dismissValidationError();
            return false;
        }

        if (amountEmpty) {
            this.setState({
                validationError: true
            });
            this.dismissValidationError();
            return false
        }
        return true;
    };

    handleUpload = () => {
      const list = {
          title: this.state.title,
          status: "active",
          list: this.state.ingredients
      };

      if (this.fieldAreValid()) {
          this.props.addingHandler(list)
              .then(this.props.updateList())
              .catch(err => console.log(err));
      }
    };

    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog" id="addingModal">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add list item</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <br/>
                        </div>
                        {this.state.validationError && <div className="alert alert-danger" role="alert">Fields cannot be empty</div> }
                        <div className="modal-body">
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text color-orangered">Title</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Sizing example input" onChange={this.handleTitleChange}/>
                            </div>
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
                            <button type="button" className="btn btn-primary bgcolor-orangered" onClick={this.handleUpload}>Upload changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
