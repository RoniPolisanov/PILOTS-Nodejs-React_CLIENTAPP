import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import google from './Login.css'

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

class Login extends Component {
    constructor(props) {
        super(props)
        
        this.loginSuccess = this.loginSuccess.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.navigate = this.navigate.bind(this);
    }
    
    navigate() {
        const query = ['consumer', 'producer'];
        query.map((query) => {
            console.log('Fetching Docs');
            let user = JSON.parse(sessionStorage.getItem('userDetails'));
            console.log('for user: ' + user.email);
            const url = `https://pilotsapp.herokuapp.com/${query}`;
            let url2 = 'https://pilotsapp.herokuapp.com/project';

            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                data.map((doc) => {
                    if (doc.email == user.email) {
                        console.log('found a match!');
                        sessionStorage.setItem('userType', JSON.stringify(query));
                        sessionStorage.setItem('userPilotsDetails', JSON.stringify(doc));
                        fetch(url2).then((res) => {
                            return res.json();
                        }).then((data) => {
                            sessionStorage.setItem('projects', JSON.stringify(data));
                        });
                    }
                }) 
            }).then(() => {
                sleep(500).then(() => {
                    (JSON.parse(sessionStorage.getItem('userType')) == 'consumer') ? this.props.history.push('/ConsumerHome') : (JSON.parse(sessionStorage.getItem('userType')) == 'producer') ? this.props.history.push('/ProducerHome') : this.props.history.push('/register')
                })
            })
        });
    }

    loginSuccess() {
        sessionStorage.setItem('userDetails', JSON.stringify(this.state.userDetails.profileObj));
        this.navigate();
    }

    responseGoogle(response) {
        !response ? console.log('Failed to connect') : this.setState({ userDetails: response });
        !this.state.userDetails ? null : this.loginSuccess();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col order-12">
                    </div>
                    <div className="col order-1">
                    <GoogleLogin style={google}
                            clientId={'27160300776-vrr4hvulicl4e83njgaj6dhbgpbrs3to.apps.googleusercontent.com'}
                            buttonText="GOOGLE ME"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}>
                        <button className="loginBtn loginBtn--google">
                            Login with Google
                        </button>
                    </GoogleLogin>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;