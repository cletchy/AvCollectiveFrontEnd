import Web3 from "web3";
import { useState } from "react";

let selectedAccount;

export const init = () => {
  let provider;

  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    window.alert("No Ethereum Browser detected! Check out MeteMask");
  }
  return provider;
};


if (typeof provider !== 'undefined'){
    //MM installed
    provider
    .request({ method: "eth_requestAccounts" })
    .then((accounts)=>{
        selectedAccount= accounts[0];
        console.log(`Selected account: ${selectedAccount}`);
    })
    .catch((err)=>{
        console.log(err);
    });

    provider.on("accountsChanged", (accounts) => {
        selectedAccount= accounts[0];
        console.log(`Changed account: ${selectedAccount}`);
        
    });

    const web3 = new Web3(provider);
};
