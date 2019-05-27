import React, { Component } from "react";
import Navigation from '../components/Navigation';
import { Router, Link } from '../routes';
import axios from 'axios';
import factory from '../ethereum/factory';
import AuthService from '../components/authentication'

class Elections extends Component {
    state = {
        loggedIn: false,
        currentUser: {}
    };
    async componentDidMount() {
        if(localStorage.getItem('currentUser')) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            await this.setState({ loggedIn: true, currentUser: user });
        }
    }
    static async getInitialProps(props) {
        let dbElections = [];
        const userId = props.query.id;
        await axios.get(`http://localhost:5000/api/voting/election/getAll/${userId}`)
        .then((res) => {
            dbElections = res.data;
        });
        factory.address = "0x117f235D305760F60DF5363FeE61d496Ec45cE18";
        const elections = await factory.methods.getCreatedElections().call();
        console.log('Elections', elections);
        return { dbElections, userId };
    }
    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('currentUser');
        Router.pushRoute('/login');
    }
    // renderElections() {
    //     if (this.props.isAuthenticated) {
    //         let items = [];
    //         this.props.elections.forEach((element,i) => {
    //             const disp =  <div key={i} className="col-lg-12 col-md-10 col-sm-12 col-xs-12"><div className='jumbotron' ><p className="text-center">{element}</p><Link route={`/elections/${element}`}>
    //                 <a href="#" className="centered" >View election</a>
    //             </Link></div></div>;
    //                 items.push(disp);
    //             });
    //         return items;
    //     } else {
    //         Router.replaceRoute(`/login`);
    //     }
    // }
    renderDBElections() {
            if (this.state.loggedIn && (this.props.userId == this.state.currentUser.id)) {
                let dbElections = [];
                this.props.dbElections.forEach((element,i) => {
                    
                    const disp = <div key={i} className="col-lg-12 col-md-10 col-sm-12 col-xs-12">
                        <div className='jumbotron' ><p className="text-center">{element.electionAddress}</p>
                            <Link route={`/elections/${element.electionAddress}`}>
                                <a href="#" className="centered" >See details</a>
                            </Link>
                        </div>
                    </div>;
                    dbElections.push(disp);
                });
                return dbElections;
            }
    }
    render() {
        if (this.state.loggedIn && (this.props.userId == this.state.currentUser.id)) {
            return (
                <Navigation>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                <div className="container" style={{width: 650}}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12">
                            <div className="center-block">
                            <ol className="breadcrumb" style={{fontSize: 20, backgroundColor: '#225'}}>
                                <li><Link route={`/new`}><a href="#">Deploy New Election</a></Link></li>
                                <li><a href="#" onClick={this.logout}>logout</a></li>
                            </ol>
                            <h3 className="text-center text--cap">Hello {this.state.currentUser.name}, Shown below are your Deployed Elections</h3>
                                <div style={{marginTop:90, marginLeft: 20}}>
                                    {this.renderDBElections()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <button style={{float: 'right', margin: 30}} type="button" onClick={this.logout} className="btn btn-danger">Logout</button>
                </div> */}
                </Navigation>
            );
        } else if(!this.state.loggedIn && (this.props.userId !== this.state.currentUser.id)) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            
            if(!user.id) {
                Router.pushRoute('/login');
            }
            return (
                <Navigation>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h3>You need to login and deploy new elections</h3>
                </div>
                </Navigation>
            );
        }
    }
}
export default Elections;