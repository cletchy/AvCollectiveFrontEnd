import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

//chainId
const NETWORK_NAME = {
  1: "Mainnet",
  3: " Ropsten",
  42: "Kovan",
  4: "Rinkeby",
  1337: "Ganache",
};

const useLocalEtherumProvider = () => {
  const [ethereumProvider, setEthereumprovider] = useState(
    window.ethereum ?? null
  );
  const [networkVersion, setNetworkVersion] = useState(0);
  const [networkName, setNetworkName] = useState("");
  const [selectedAdresses, setSelectedAdresses] = useState("");
  const [web3Provider, setWeb3Provider] = useState(null);

  useEffect(() => {
    const handleEthereum = async () => {
      const { ethereum } = window;

      setEthereumprovider(ethereum);
      setWeb3Provider(new Web3(ethereum));

      //chainID
      const chainId = parseInt(
        await ethereum.request({ method: "eth_chainId" }),
        16
      );

      setNetworkName(NETWORK_NAME[chainId]);

      const networkVersion = await ethereum.request({ method: "net_version" });
      setNetworkVersion(networkVersion);

      const handleAccountsChanged = (addresses) => {
        console.log("handleAccountsChanged", addresses);
        setSelectedAdresses(addresses[0]);
      };

      ethereum.on("accounteChanged", (addresses) =>
        handleAccountsChanged(addresses)
      );

      const addresses = await ethereum.request({ method: "eth_accounts" });
      setSelectedAdresses(addresses[0]);

      ethereum.on("chainChanged", (chainId) => {
        console.log("chainChanged", chainId);
        //clean up before page reloads
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.location.reload();
      });
    };

    const handleLoad = async () => {
      console.log("handleload");
      const provider = await detectEthereumProvider();

      if (provider) {
        if (provider !== window.ethereum) {
          console.error("Do you have multiple wallets installed?");
        }

        handleEthereum();
      } else {
        console.log("Install provider...");
      }
    };

    handleLoad();
  }, []);

  return {
    ethereumProvider,
    networkVersion,
    networkName,
    selectedAdresses,
    web3Provider,
  };
};

//Context 
const EhtereumContext = createContext();

//Provider
export function EthereumContextProvider({children}){
    //Value object
    const value = useLocalEtherumProvider();

    return (
        <EhtereumContext.Provider value = {value}>
            {children}
        </EhtereumContext.Provider>
    );
}

//Custom hook 
export function useEthereumState(){
    const context = useContext(EhtereumContext);
    if(!context){
        throw new Error(
            "<EthereumContextProvider> might be missing",
        );
    }
    return context;
}
