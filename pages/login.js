import React, { Component } from "react";
import Navigation from '../components/Navigation';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthService from '../components/authentication';
import { Link, Router } from '../routes';


export default class LoginPage extends Component {

    // static async getInitialProps() {
    // }
    state = {
        email: '',
        password: '',
        user: {},
        decodedToken: {},
        loggedIn: false
    };

    componentDidMount() {
        if(localStorage.getItem('currentUser')) {
            this.setState({ loggedIn: true });
        }
    }
    
    login = async (event) => {
        event.preventDefault();
        AuthService.login(this.state.email, this.state.password)
        .then((res) => {
            this.setState({ user: res.data });
            if (this.state.user && this.state.user.token) {
                localStorage.setItem('currentUser', JSON.stringify(this.state.user));
                Router.pushRoute(`/user/${this.state.user.id}`);
            }
            this.state.email = '';
            this.state.password = '';
            // this.state.decodedToken = jwt_decode(res.data.token);
            // console.log(this.state.decodedToken);
        });

    }

    render() {
        return (
            <Navigation>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="container" style={{width: 650}}>
                    <div className="row">
                        <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" autoComplete="email" onChange={event => this.setState({ email: event.target.value})} id="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" autoComplete="current-password" type="password" onChange={event => this.setState({ password: event.target.value})} id="password"/>
                        </div>
                            <button type="submit" className="btn btn-success">Login</button>
                            <Link route={`/signup`} ><a style={{marginLeft: 10}} href="#">Sign up</a></Link>
                    </form>
                    {/* <Link route={`/login`}>
                        <a className="btn btn-deep-orange">Login</a>
                    </Link> */}
                </div>
            </div>
        </div>
            </Navigation>
        )
    }
}