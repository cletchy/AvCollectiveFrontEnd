import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Dummy_Vehicles } from "../functions/Dummy_Vehicles";

import { contractAddress, contractAbi } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const AvContract = new ethers.Contract(contractAddress, contractAbi, signer);

export const TransactionProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(Dummy_Vehicles);
  //sellected Vehicle

  //MM conection
  const [currentAccount, setCurrentAccount] = useState(null);
  //const [currentNetwork, setCurrentNetwork] = useState();

  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const introAccounts = await ethereum.request({ method: "eth_accounts" });

      if (introAccounts.length) {
        setCurrentAccount(introAccounts[0]);
      } else {
        console.log("No accounts found!");
      }
    } catch (error) {
      alert(error.error.message);
      throw new Error("No ehtereum object!");
    }
  };

  const connectWallet = async () => {
    if (!ethereum) return alert("Please install Metamask");
    try {
      // const netId = await provider.getNetwork();
      // const networkName = netId.name;
      // setCurrentNetwork(networkName);

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      alert(error.message);
      throw new Error("No ehtereum object!");
    }
  };

  const chainChangedHandler = async () => {
    alert("Make sure that you are on Ropsten");
    window.location.reload();
  };
  window.ethereum.on("chainChanged", chainChangedHandler);

  const accountChangedHandler = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);
  };
  window.ethereum.on("accountsChanged", accountChangedHandler);

  //Users
  const [seat, setSeat] = useState(0);
  const [seatStatus, setSeatStatus] = useState(null);
  const contract = AvContract;

  const handleUser = async (event) => {
    try {
      event.preventDefault();
      setSeat(event.target.value);
      const userSeatRequest = await contract.enrollUser(event.target.value);
      const selectVehicleReceipt = await userSeatRequest.wait();
      const userLogs = selectVehicleReceipt.events?.filter((x) => {
        return x.event === "LogCallRide";
      })[0].args.accountAddress;

      if (userLogs.lenth !== 0) {
        setSeatStatus(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //vehicle
  const [sellection, setSellection] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [confirmatonStatus, setConfirmationStatus] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [unlock, setUnlock] = useState(null);
  const [complete, setComplete] = useState(null);

  const [cancelationFee, setCancelationFee] = useState(null);

  const confirmHandler = async (event) => {
    event.preventDefault();
    try {
      const confirmRequest = await contract.confirmRide({
        value: selectedPrice,
      });
      const confirmReceipt = await confirmRequest.wait();
      const confirmLogs = confirmReceipt.events?.filter((x) => {
        return x.event === "TxConfirmed";
      })[0].args.deposit;

      const price = ethers.utils.formatEther(confirmLogs);
      setEscrow(price);
      setConfirmationStatus(true);
    } catch (error) {
      console.log(error.error.message);
    }
  };

  const startHandler = async (event) => {
    event.preventDefault();
    try {
      const startRequest = await contract.startCarRide();
      const startReceipt = await startRequest.wait();
      const startLogs = startReceipt.events?.filter((x) => {
        return x.event === "RideStarts";
      })[0].args.RideStatus;

      setUnlock(startLogs);
    } catch (error) {
      alert(error.error.message)
    }
  };

  const completeHandler = async (event) => {
    event.preventDefault();
    try {
      const completeRequest = await contract.conmpleteCarRide();
      const completeReceipt = await completeRequest.wait();
      const completeLogs = completeReceipt.events?.filter((x) => {
        return x.event === "RideCompletes";
      })[0].args.RideStatus;

      setComplete(completeLogs);
    } catch (error) {
      alert(error.error.message)
    }
  };

  const cancelHandler = async (event) => {
    event.preventDefault();
    try {
      const canselRequest = await contract.RideIsCanceled();
      const canselReceipt = await canselRequest.wait();
      const confirmLogs = canselReceipt.events?.filter((x) => {
        return x.event === "RideCanceled";
      })[0].args.payment;

      const fee = ethers.utils.formatEther(confirmLogs);

      setCancelationFee(fee);
    } catch (error) {
      alert(error.error.message);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        vehicles,
        connectWallet,
        currentAccount,
        handleUser,
        setVehicles,
        sellection,
        setSellection,
        setSelectedId,
        selectedId,
        setSelectedAddress,
        setSelectedPrice,
        setSelectedSpace,
        setSelectedStatus,
        seat,
        seatStatus,
        contract,
        confirmHandler,
        confirmatonStatus,
        escrow,
        startHandler,
        unlock,
        completeHandler,
        complete,
        cancelHandler,
        cancelationFee,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
