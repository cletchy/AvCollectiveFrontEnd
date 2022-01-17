import { useState } from "react";

import "./VehicleForm.css";

const VehicleForm = (props) => {
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [space, setSpace] = useState("");
  const [status, setState] = useState("");

  const addressHandler = (event) => {
    setAddress(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const spaceHandler = (event) => {
    setSpace(event.target.value);
  };
  const stateHandler = (event) => {
    setState(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const vehicleData = {
      Address: address,
      Price: price,
      Space: space,
      Status: status,
    };

    props.onSaveVehicleData(vehicleData);
    setAddress("");
    setPrice("");
    setSpace("");
    setState("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-vehicle__controls">
        <div className="new-vehicle__controls">
          <label>Address</label>
          <input type="text" value={address} onChange={addressHandler} />
        </div>
        <div className="new-vehicle__controls">
          <label>Price</label>
          <input
            type="number"
            min={0}
            max={0.0035}
            step={0.0005}
            value={price}
            onChange={priceHandler}
          />
        </div>
        <div className="new-vehicle__controls">
          <label>Available Spaces</label>
          <input
            type="number"
            min={1}
            step={1}
            value={space}
            onChange={spaceHandler}
          />
        </div>
        <div className="new-vehicle__controls">
          <label>Status</label>
          <input type="text" value={status} onChange={stateHandler} />
        </div>
      </div>
      <div className="new-vehicle__actions">
        <button type="submit">Add Vehicle</button>
        <button type="button" onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default VehicleForm;
