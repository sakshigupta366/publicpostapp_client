import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './man-key.jpg';
import './App.css';
import axios from 'axios';

// const Login = () => {
//     const history = useHistory();
//     const [email, setEmail] = useState(' ');
//     const [password, setPassword] = useState(' ');

// const loginUser = async (e) => {
//     e.preventDefault();
//     const response = await fetch('/signin', {
//         method: "post",
//         credentials:'include',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             email: email,
//             password: password
//         })
//     });   

//     const data = response.json(); 
//     console.log('login response',data);      

//     if (response.status === 400 || !data) {
//         window.alert("invalid credentials");
//     }
//     else {
//         window.alert("login successful");
//         console.log("login successful");

//         history.push("/dashboard");
//     }
// };

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    getSelect = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;     //obj destructuring
        const registered = {
            email: email,
            password: password,
        }
        console.log(registered);
        var header = {
            'Content-Type': 'application/json',
        };
        var config = {
            method: "post",
            url: "http://localhost:5000/signin",
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
                window.alert("login successful");
                var token = response.data.token;
                this.setCookie('token', token);
                window.location.href = '/dashboard';
            }
        }
        catch (error) {
            console.log(error);
            window.alert("invalid credentials");
        }
    }

    render() {
        return (<>
            <div className="container">
                <div className="row ">
                    <div className="col-sm-6 App-header">
                        <img src={image} alt="" />
                    </div>
                    <div className="col-sm-6 App-header" >
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                        <h4 className="mb-4 text-center font-weight-bold">Member Login</h4>
                        <div className="form-div">
                            <form className='App'>

                                <input type="text"
                                    placeholder="&#xf0e0; Email"
                                    autoComplete="off"
                                    value={this.state.email}
                                    onChange={this.changeEmail}
                                    className="placeicon mt-3 form-control rounded-pill" required />

                                <input type="password"
                                    placeholder="&#xf023; Password "
                                    autoComplete="off"
                                    value={this.state.password}
                                    onChange={this.changePassword}
                                    className="placeicon mt-3 form-control rounded-pill" required />
                                <div className='text-center'>
                                <input type='submit' className='mt-4 btn btn-success btn-block rounded-pill' value='LOGIN' onClick={this.getSelect} />
                                    <p className='mt-2'>Forgot Username / Password?</p>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default Login;