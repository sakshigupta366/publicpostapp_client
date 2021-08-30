import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''            
        }

        // bind() is used to define states but if we use arrow function then we do not need that
        // // this.changeUserName = this.changeUserName.bind(this)
        // // this.changeEmail = this.changeEmail.bind(this)
        // // this.changePassword = this.changePassword.bind(this)
        // // this.changeCPassword = this.changeCPassword.bind(this)
        // // this.onSubmit = this.onSubmit.bind(this)

    }

    changeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    changeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    
     onSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;     //obj destructuring
        const registered = {
            username: username,
            email: email,
            password: password
        }
        console.log(registered);
        var header = {
            'Content-Type': 'application/json',
        };
        var config = {
            method: "post",
            url: "http://localhost:5000/register",
            headers: header,
            data: registered,
            // data: data
        };
        console.log(config);
        try {
            const response = await axios(config);
            console.log(response);
            // var token = response.data.token;
            // this.setCookie('token', token);
            console.log(response.status);
            if (response.status === 200) {
                window.alert("Registered successfully");               
                window.location.href = '/login';
            }
        }
        catch (error) {
            console.log(error);
            window.alert("something went wrong!!");
        }
    }

    render() {
        return (<>
            <div className="container">
                <div className="form-div">
                    <form >
                        <input type="text"
                            placeholder="user name"
                            autoComplete="new-password"
                            onChange={this.changeUserName}
                            value={this.state.userName}
                            className="mt-4 form-control form-group" />

                        <input type="text"
                            placeholder="email"
                            autoComplete="new-password"
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className="mt-3 form-control form-group" />

                        <input type="password"
                            placeholder="password"
                            autoComplete="new-password"
                            onChange={this.changePassword}
                            value={this.state.password}
                            className="mt-3 form-control form-group" />
                        
                        <input type='submit' className='btn btn-danger btn-block' value='submit' onClick={this.onSubmit} />
                        <h5 className='mt-3 text-center'>
                            <Link to="/login">Already have an account ?</Link>
                        </h5>
                    </form>
                </div>
            </div>

        </>
        );
    }
}
export default Register;