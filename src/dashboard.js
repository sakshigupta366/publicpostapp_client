import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from '@material-ui/lab';
import './App.css';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = theme => ({
    root: {
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',    
        margin: '40px 20px 20px 0px',

    },
    root1: {
        margin: '0px 0px 20px 0px',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: ''
        }
        console.log("constructor");
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    changeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    changeBody = (event) => {
        this.setState({
            body: event.target.value
        })
    }


    onSubmit = async (event) => {
        event.preventDefault();
        try {
            const { title, body } = this.state;  //obj destructuring
            const registered = {
                title: title,
                body: body
            }

            console.log(registered);
            var headers = {
                'Content-Type': 'application/json',
                // Accept: 'application/json'
            }
            const jwtToken = this.getCookie('token');
            console.log(jwtToken);
            if (jwtToken) {
                // console.log(jwtToken);
                headers.authorization = jwtToken;       //to pass token from frontend to backend
                console.log(headers);
            }
            else {
                window.location.href = '/';
            }

            var config = {
                method: "POST",
                credentials: 'include',
                url: "http://localhost:5000/createpost",
                data: registered,
                headers: headers,
            };
            console.log(config);

            const response = await axios(config);
            console.log('dataaaaa', response);
            this.setState({
                title: '',
                body: ''
            })
        }
        catch (err) {
            console.log(err);
            alert("Please Fill the form properly");
        }
    }
    onLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/';
    }

    render() {
        const { classes } = this.props;
        return (<>
            <div className={classes.root1}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit" onClick={this.onLogout} >
                            logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>

            <div className='container'>
                {this.state.alertopen ? <Alert className={classes.root} onClose={() => this.alertClose()} severity="success">
                    Your Leave Has Successfully Been Applied!
                </Alert> : null}

                <Button className="mb-4">
                    Create Post
                </Button>

                <div className="card input-filed"
                    style={{
                        margin: "30px auto",
                        maxWidth: "500px",
                        padding: "20px",
                        textAlign: "center"
                    }}
                >
                    <input
                        type="text"
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.changeTitle}
                    />
                    <input
                        type="text"
                        placeholder="body"
                        value={this.state.body}
                        onChange={this.changeBody}
                    />

                    <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                        onClick={this.onSubmit}

                    >
                        Submit post
                    </button>
                </div>
            </div>
        </>
        );
    }
}
export default withStyles(useStyles)(Dashboard)
