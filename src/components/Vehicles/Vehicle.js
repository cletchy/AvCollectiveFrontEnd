import { useState, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

import VehicleItem from "./VehicleItem";
import VehclePriceFilter from "./VehiclePriceFilter";
import Card from "../UI/Card";
import "./Vehicle.css";

const Vehicle = (props) => {

  const {selectedId,sellection} = useContext(TransactionContext);
  const [filteredPrice, setFilteredPrice] = useState("0.0025");


  const filterChangeHandler = (selectedPrice) => {
    setFilteredPrice(selectedPrice);
  };

  // const filterVehicles = props.items.filter(vehicle=>{
  //   return vehicle.Price.toString()===filteredPrice
  // });

  return (
    <div>
      <h2 className ="vehicle__line">Step 2</h2>
      
      {sellection &&(
        <div className = "vehicle__h3">
          <h3>Vehicle No: {selectedId} is selected!</h3>
        </div>
      )}

      <Card className="vehicle__card">
        
        <VehclePriceFilter
          selected={filteredPrice}
          onChangeFilter={filterChangeHandler}
        />
        {/* {filterVehicles.map((vehicle) */}
        {props.items.map((vehicle) => (
          <VehicleItem
            key={vehicle.Id}
            Id={vehicle.Id}
            Price={vehicle.Price}
            Address={vehicle.Address}
            Space={vehicle.Space}
            Status={vehicle.Status}
          />
        ))}
 
      </Card>
    </div>
  );
};

export default Vehicle;
