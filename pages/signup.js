import React, { Component } from "react";
import Navigation from '../components/Navigation';
import axios from 'axios';
import { Link } from '../routes';


export default class LoginPage extends Component {

    // static async getInitialProps() {
    // }
    state = {
        email: '',
        password: '',
        userName: '',
        user: {}
    };
    
    signUp = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/voting/user/register', { UserName: this.state.userName, UserEmail: this.state.email, Password: this.state.password})
        .then((res) => {
            this.setState({ user: res.data });
            console.log(res.data);
            console.log('Sign up clicked');
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
                    <form onSubmit={this.signUp}>
                        <div className="form-group">
                            <label htmlFor="userName">Full Name</label>
                            <input className="form-control" onChange={event => this.setState({ userName: event.target.value})} id="userName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" onChange={event => this.setState({ email: event.target.value})} id="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" onChange={event => this.setState({ password: event.target.value})} id="password"/>
                        </div>
                            <button type="submit" className="btn btn-success">Sign up</button>
                            <Link route={`/login`} ><a style={{marginLeft: 10}} href="#">Login</a></Link>
                    </form>
                    {/* <Link route={`/login`}> */}
                        {/* <a className="btn btn-deep-orange" onClick={this.state.newAuth.login()}>Login</a> */}
                    {/* </Link> */}
                </div>
            </div>
        </div>
            </Navigation>
        )
    }
}