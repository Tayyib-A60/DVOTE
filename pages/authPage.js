// import React, { Component } from 'react';
// import Auth from '../components/Auth';
// import Head from 'next/head';
// import { Link, Router } from '../routes';

// class AuthPage extends Component {

//     state = {
//         auth: new Auth()
//     }
//   goTo(route) {
//     // this.state.auth.history.replace(`/${route}`)
//   }

//   login() {
//     this.state.auth.login();
//   }

//   logout() {
//     this.state.auth.logout();
//   }

//   componentDidMount() {
//     const { renewSession } = this.state.auth;

//     if (localStorage.getItem('isLoggedIn') === 'true') {
//       renewSession();
//     }
//   }

//   render() {
//     const isAuthenticated  = this.state.auth.isAuthenticated;

//     return (
//       <div>
//           <Head>
//             <script src="https://cdn.auth0.com/js/auth0/9.10/auth0.min.js"></script>
//             <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
//             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
//             <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
//         </Head>
//         <div>
//         <nav className="navbar navbar-default navbar-fixed-top">
//         <div className="container">
//         <div className="navbar-header">
//             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
//               <span className="sr-only">Toggle navigation</span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//               <span className="icon-bar"></span>
//             </button>
//             <Link route={`/`}>
//             <a className="navbar-brand" href="#">Election DAPP</a>
//             </Link>
//           </div>
//         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//             <ul className="nav navbar-nav">
//               <li><Link route={`/`}><a href="#">Elections</a></Link></li>
//             </ul>
//             <ul className="nav navbar-nav navbar-right">
//               <li><Link route={`/login`}><a href="#" onClick={this.login.bind(this)}>Login</a></Link></li>
//               <li><a href="#" onClick={this.logout.bind(this)}>Log out</a></li>
//             </ul>
//             </div>
//         </div>
//     </nav>
//             {/* {
//               !isAuthenticated() && (
//                   <Button
//                     bsStyle="primary"
//                     className="btn-margin"
//                     onClick={this.login.bind(this)}
//                   >
//                     Log In
//                   </Button>
//                 )
//             }
//             {
//               isAuthenticated() && (
//                   <Button
//                     bsStyle="primary"
//                     className="btn-margin"
//                     onClick={this.logout.bind(this)}
//                   >
//                     Log Out
//                   </Button>
//                 )
//             } */}
//       </div>
//     </div>
//     );
//   }
// }
// export default AuthPage;