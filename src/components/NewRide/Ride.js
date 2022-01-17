import { useState, useContext } from "react";

import { TransactionContext } from "../../context/TransactionContext";
import "./Ride.css";

const Ride = () => {
  const {
    confirmHandler,
    confirmatonStatus,
    escrow,
    startHandler,
    unlock,
    completeHandler,
    complete,
    cancelHandler,
    cancelationFee,
  } = useContext(TransactionContext);

  return (
    <div>
      <div className="Ride">
        <h2>Step 3</h2>
        <div className="vehicle__h3">
          {confirmatonStatus && (
            <h3>The ride is confirmed. {escrow} Eth held in escrow !</h3>
          )}
          {unlock !== null && <h3>Vehicle unlocked!</h3>}
          {complete !== null && (
            <h3>
              You have reached your destination.
              <br /> Thank you
            </h3>
          )}
          {cancelationFee !== null && (
            <h3>
              The ride has been canscled.
              <br /> {cancelationFee} penalty has ben paid!
            </h3>
          )}
        </div>
        <div>
          <button  onClick={confirmHandler}>Confirm ride</button>
        </div>
        <div>
          <button onClick={startHandler}>Unlock Vehicle</button>
        </div>
        <div>
          <button onClick={completeHandler}>
            Complete ride and releace Vehicle
          </button>
        </div>
        <div>
          <button onClick={cancelHandler}>Cancel ride fees applied</button>
        </div>
      </div>
    </div>
  );
};

export default Ride;
