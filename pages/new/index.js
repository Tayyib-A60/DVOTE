import React, { Component } from "react";
import Navigation from '../../components/Navigation';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router, Link } from '../../routes';
import axios from 'axios';

class CreateElection extends Component {
    state = {
        electionName: '',
        errorMessage: '',
        currentUser: {},
        loggedIn: false
    };
    async componentWillMount() {
        this.setState({ loggedIn: true});
    }
    async componentDidMount() {
        if(localStorage.getItem('currentUser')) {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            await this.setState({ loggedIn: true, currentUser: user });
            console.log(this.state.currentUser);
            
        } else {
            await this.setState({ loggedIn: false });
        }
    }
    static async getIntitialProps(props) {

    }

    createElectionInDb (electionAddress) {
           axios.post('http://localhost:5000/api/voting/election/create', { ElectionAddress: electionAddress, UserId: this.state.currentUser.id })
            .then((res) => {
                console.log(res.data);
                console.log('Election Created');
            });
    }

    deployElection = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        try {
            await factory.methods.createElection(this.state.electionName).send({from: accounts[0]});
            const elections = await factory.methods.getCreatedElections().call();
            for (let i = 0; i < 1; i++) {
                this.createElectionInDb(elections[elections.length-1]);
            }
            Router.pushRoute(`/user/${this.state.currentUser.id}`);
        } catch (error) {
            this.setState({errorMessage: error.message});
            console.log(error.message);
        }
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('currentUser');
        Router.pushRoute('/login');
    }
    render() {
        console.log(this.state.user, this.state.loggedIn);
        
        // const user = JSON.parse(localStorage.getItem('currentUser'));
        if (this.state.loggedIn) {
            return (
                <Navigation>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="container" style={{width: 650}}>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                            <ol className="breadcrumb" style={{fontSize: 20, backgroundColor: '#225'}}>
                                <li><Link route={`/user/${this.state.currentUser.id}`}><a href="#">Election List</a></Link></li>
                                <li><a href="#" onClick={this.logout}>logout</a></li>
                            </ol>
                            <h2 className="text-center" style={{marginBottom: 60}}>Create new Election</h2>
                            <form onSubmit={this.deployElection}>
                                <div className="form-group">
                                    <label htmlFor="electionDesc">Election Description</label>
                                    <input className="form-control" onChange={event => this.setState({ electionName: event.target.value})} id="electionDesc"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Deploy Election</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </Navigation>
            )
        } else {
            Router.pushRoute('/login');
            return (
                <div></div>
            );
        }
    }
}

export default CreateElection;