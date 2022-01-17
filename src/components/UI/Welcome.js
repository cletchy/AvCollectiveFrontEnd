import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

import "./Welcome.css";

const Welcome = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <div className="welcome">
      {!currentAccount && <div>
        <button onClick={connectWallet}>Connect</button>

        <p>
          To proceed
          <br />
          Connect to your Wallet
          <br/>
          <br/>
          Operating network: 
          <br/>    
          Ropsten
        </p>
      </div>}
    </div>
  );
};

export default Welcome;
