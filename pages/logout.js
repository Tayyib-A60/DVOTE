// import React, { Component } from "react";
// import Navigation from '../components/Navigation';
// import jwt_decode from 'jwt-decode';
// import AuthService from '../components/authentication';
// import { Link, Router } from '../routes';


// export default class LoginPage extends Component {
//     state = {
//         email: '',
//         password: '',
//         user: {},
//         decodedToken: {},
//         loggedIn: false
//     };

//     componentDidMount() {
//         if(localStorage.getItem('currentUser')) {
//             this.setState({ loggedIn: true });
//         }
//     }
    
//     logout() {
//         // event.preventDefault();
//         if(this.state.loggedIn) {
//             localStorage.removeItem('currentUser');
//             Router.replaceRoute('/login');
//         }
//         return <h2>Something happended</h2>;

//     };

//     render() {
//         return (
//             <Navigation>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                 {this.logout()}
//             </Navigation>
//         )
//     }
// }