import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import RegisterHandler from "../utils/usersHandlers/RegisterHandler";

export default class Register extends React.Component {

    state = {
        email: "",
        password: "",
        nickname: "",
        warning: "",
        displayWarning: false
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    handleNickNameChange = (event) => {
        this.setState({
            nickname: event.target.value
        })
    };

    navigateToLoginPanel = () => {
        this.props.history.push('/')
    };

    displayWarning = () => {
        setTimeout(() => {
            this.setState({
                displayWarning: false
            });
        }, 8000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const passwordValid = RegisterHandler.validatePassword(this.state.password);
        const emailValid = RegisterHandler.validateEmail(this.state.email);
        const userNameNotEmpty = RegisterHandler.userNameNotEmpty(this.state.nickname);

        if (!passwordValid){
            this.setState({
                displayWarning: true,
                warning: "Password must have at least 8 characters."
            });
            this.displayWarning();
            return;
        }

        if (!emailValid){
            this.setState({
                displayWarning: true,
                warning: "Email has incorrect format."
            });
            this.displayWarning();
            return;
        }

        if (!userNameNotEmpty){
            this.setState({
                displayWarning: true,
                warning: "Nickname field is empty."
            });
            this.displayWarning();
            return;
        }

        RegisterHandler.registerUser(this.state.email, this.state.password, this.state.nickname)
            .then(()=> this.props.history.push('/app/' + this.state.nickname))
    };

    render() {
        return (
            <div className="user-handler">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="text-primary">Email address</label>
                        <Input type="email" value={this.state.email} handleChange={this.handleEmailChange}/>
                        <small className="form-text text-muted">
                            We'll never share your email with
                            anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label className="text-primary">Nick name</label>
                        <Input type="text" value={this.state.nickname} handleChange={this.handleNickNameChange}/>
                    </div>
                    <div className="form-group">
                        <label className="text-primary">Password</label>
                        <Input type="password" value={this.state.password} handleChange={this.handlePasswordChange}/>
                    </div>
                    <Button
                        text="Register"
                        classNames="btn btn-primary btn-lg"
                        width="50%"
                    />
                    {this.state.displayWarning && <p className="text-danger validation-warning">{this.state.warning}</p>}
                </form>
                <div className="user-handler-bottom">
                    <p>You already have an account? <span className="text-primary" onClick={this.navigateToLoginPanel}>Sign in now.</span></p>
                </div>
            </div>
        )
    }
}
