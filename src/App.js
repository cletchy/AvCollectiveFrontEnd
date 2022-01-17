import {useContext } from "react";


import { TransactionContext } from "./context/TransactionContext";
import Vehicle from "./components/Vehicles/Vehicle";



import Logo from "./components/UI/Logo";
import NewVehicle from "./components/NewVehicle/NewVehicle";
import User from "./components/NewRide/User";
import Ride from "./components/NewRide/Ride";
import Welcome from "./components/UI/Welcome";
import "./App.css";

function App() {


  const { currentAccount ,vehicles, setVehicles} = useContext(TransactionContext);

  const addVehicleHandler = (vehicle) => {
    setVehicles((prevVehicles) => {
      return [vehicle, ...prevVehicles];
    });
  };

  return (
    <div>
      <header className="main-header">
        <Logo />
        {currentAccount && (
        <p>Current account: <br />
          {currentAccount}
        </p>
        
        )}
       
      </header>
      <Welcome />

      {currentAccount && (
        <div className="App-setup">
          <div>
            <User />
          </div>
          <div className="App-setup__step2">
            <Vehicle items={vehicles} />
            <NewVehicle onAddVehicle={addVehicleHandler} />
          </div>
          <div>
            <Ride />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
