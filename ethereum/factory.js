import web3 from './web3';
import CreateElection from './build/CreateElection.json';

const instance = new web3.eth.Contract(
    JSON.parse(CreateElection.interface),
    '0x117f235D305760F60DF5363FeE61d496Ec45cE18'
);

export default instance;