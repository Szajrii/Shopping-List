import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import LoginHandler from "../utils/usersHandlers/LoginHandler";

export default class Login extends React.Component {

    state = {
        email: "",
        password: "",
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

    navigateToRegisterPanel = () => {
        this.props.history.push('/register')
    };

    displayWarning = () => {
        setTimeout(() => {
            this.setState({
                displayWarning: false
            });
        }, 8000);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const passwordValid = LoginHandler.validatePassword(this.state.password);
        const emailValid = LoginHandler.validateEmail(this.state.email);

        if (!passwordValid) {
            this.setState({
                displayWarning: true,
                warning: "Password must have at least 8 characters."
            });
            this.displayWarning();
            return;
        }

        if (!emailValid) {
            this.setState({
                displayWarning: true,
                warning: "Email has incorrect format."
            });
            this.displayWarning();
            return;
        }

        LoginHandler.loginUser(this.state.email, this.state.password)
            .then( () => {
                LoginHandler.auth.onAuthStateChanged( user => {
                    if (user) {
                        this.props.history.push({pathname: '/app', state: {email: this.state.email }});
                    }
                })
            })
            .catch( err => {
                this.setState({
                    displayWarning: true,
                    warning: err.message
                });
                this.displayWarning();
            })
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
                        <label className="text-primary">Password</label>
                        <Input type="password" value={this.state.password} handleChange={this.handlePasswordChange}/>
                    </div>
                    <Button
                        text="Login"
                        classNames="btn btn-primary btn-lg"
                        width="50%"
                    />
                    {this.state.displayWarning && <p className="text-danger validation-warning">{this.state.warning}</p>}
                </form>
                <div className="user-handler-bottom">
                    <p>You don't have an account? <span className="text-primary" onClick={this.navigateToRegisterPanel}>Sign up now.</span></p>
                </div>
            </div>
        )
    }
}
