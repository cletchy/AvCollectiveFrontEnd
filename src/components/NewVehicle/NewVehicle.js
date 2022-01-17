import { useState } from "react";

import VehicleForm from "./VehicleForm";
import "./NewVehicle.css";

const NewVehicle = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveVehicleDataHandler = (enteredVehicleData) => {
    const vehicleData = {
      ...enteredVehicleData,
      Id: Math.random().toString(),
    };

    props.onAddVehicle(vehicleData);
    console.log(vehicleData);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-vehicle">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Vehicle </button>
      )}
      {isEditing && (
        <VehicleForm
          onSaveVehicleData={saveVehicleDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewVehicle;
