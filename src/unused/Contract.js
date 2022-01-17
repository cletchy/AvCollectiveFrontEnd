import AvRideContract from "../contracts/AvRide.json";

const networkId = await web3.eth.net.getId();

const AvRide = new web3.eth.Contract(
  AvRideContract.abi,
  AvRideContract.networks[networkId].address
);
