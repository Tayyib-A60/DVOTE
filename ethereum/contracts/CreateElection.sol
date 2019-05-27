pragma solidity ^0.5.0;

import './election.sol';

contract CreateElection {

    address[] public deployedElections;

    function createElection(string memory _electionName) public {
       Election newElection = new Election(_electionName);
        deployedElections.push(address(newElection));
    }
    
    function getCreatedElections() public view returns(address[] memory) {
        return deployedElections;
    }
}