import React, { Component } from "react";
import Election from '../../ethereum/election';
import Navigation from '../../components/Navigation';
import web3 from "../../ethereum/web3";
import { Router, Link } from '../../routes';
import axios from 'axios';

class Vote extends Component {

    state = {
        candidateName: '',
        errorMessage: '',
        choice: '',
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
        console.log('getInitialProps');
        const election = Election(props.query);
        const { address } = props.query;
        console.log(address, props.query.address);
        election.address = props.query.address;
        
        const description = await election.methods.electionDescription().call();
        const numOfCandidates = await election.methods.candidatesCount().call();
        let dbElections = [];
        await axios.get(`http://localhost:5000/api/voting/election/getAll/1`)
        .then((res) => {
            dbElections = res.data;
            console.log(res.data);
        });
        
        let candidates = [];
        for(let i = 1; i <= parseInt(numOfCandidates); i++) {
            const candidate = await election.methods.candidates(i).call();
            candidates.push(candidate);
        }
        console.log(address);
        

        return { description, election, address, candidates };
    // } else {
    //     Router.replaceRoute('/login');
    //     // return { };
    // }
// }
    }

    addCandidate = async (event) => {
        event.preventDefault();
        const election = this.props.election;
        const candidateName = this.state.candidateName;
        console.log(candidateName);
        try {
            const accounts = await web3.eth.getAccounts();
            await election.methods.addCandidate(candidateName).send({
                from: accounts[0]
            });
            Router.pushRoute(`/elections/${this.props.address}`);
        } catch (error) {
            this.setState({errorMessage: error.message});
            console.log(this.state.errorMessage);
            
        }
    }

    renderCandidates() {
        if(this.state.loggedIn) {
            let items = [];
            this.props.candidates.forEach((candidate, index) => {
                const candidateData = <tr key={index}>
                    <td>{parseInt(candidate[0])}</td>
                    <td>{candidate[1]}</td>
                    <td>{parseInt(candidate[2])}</td>
                    </tr>;
                items.push(candidateData);
            });
            return items;
        }
    }
    renderOptions() {
        if(this.state.loggedIn) {
            let items = [];
            this.props.candidates.forEach((candidate, index) => {
                const optionData = <option key={index} value={parseInt(candidate[0])}>{candidate[1]}</ option>;
                items.push(optionData);
            });
            return items;
        }
    }

    castVote = async (event) => {
        event.preventDefault();
        if(this.state.loggedIn) {
            const accounts = await web3.eth.getAccounts();
            console.log((this.state.choice));
            const election = this.props.election;
            await election.methods.vote((this.state.choice)).send({from: accounts[0]});
        }
    }

    render() {
        return (
            <Navigation>
                <br></br>
                <br></br>
                <br></br>
    <div className="container" style={{width: 650}}>
        <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                    <ol className="breadcrumb" style={{fontSize: 20, backgroundColor: '#225'}}>
                        <li><Link route={`/user/${this.state.currentUser.id}`}>
                            <a href="#">Election List</a>
                            </Link>
                        </li>
                        <li><a href="#" onClick={this.logout}>logout</a></li>
                    </ol>
                   <h2>{this.props.description}</h2>
                   <br></br>
                    <div>
                    <form onSubmit={this.addCandidate}>
                        <div className="form-group">
                            <label htmlFor="candidateName">Candidate Name</label>
                            <input className="form-control" onChange={event => this.setState({ candidateName: event.target.value})} id="candidateName"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Add Candidate</button>
                        <hr/>
                    </form>
                    </div>
                    <div id="content">
                        <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Votes</th>
                            </tr>
                            {this.renderCandidates()}
                        </thead>
                        <tbody id="candidatesResults">
                        </tbody>
                        </table>
                    </div>
                    <form onSubmit={this.castVote}>
                    <div className="form-group">
                        <label htmlFor="candidatesSelect">Select Candidate</label>
                        <select onChange={event => this.setState({ choice: event.target.value})} className="form-control" id="candidatesSelect">
                            {this.renderOptions()}
                        </select>
                        <br></br>
                        <button type="submit" className="btn btn-primary">Vote</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
            </Navigation>
        )
    }
}

export default Vote;