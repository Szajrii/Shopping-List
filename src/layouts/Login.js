import React from 'react';
import {useHistory, Redirect} from "react-router-dom";
import Input from '../components/Input';
import Button from '../components/Button';

export default class Login extends React.Component {

    state = {
        email: "",
        password: ""
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

    render() {
        return (
            <div className="user-handler">
                <form>
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
                </form>
                <div className="user-handler-bottom">
                    <p>You don't have an account? <span className="text-primary" onClick={this.navigateToRegisterPanel}>Sign up now.</span></p>
                </div>
            </div>
        )
    }
}
