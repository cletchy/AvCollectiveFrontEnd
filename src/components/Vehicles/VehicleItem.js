import { useState, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

import Card from "../UI/Card";
import "./VehicleItem.css";

const VehicleItem = (props) => {
  const vehicleID = "Id";
  const vehicleAdderss = "Address";
  const vehiclePrice = "Price";
  const vehicleSpace = "Available Spaces";
  const vehicleStatus = "Status";

  const {
    contract,
    setSellection,
    setSelectedId,
    setSelectedAddress,
    setSelectedPrice,
    setSelectedSpace,
    setSelectedStatus,
  } = useContext(TransactionContext);


  const [status, setStatus] = useState(props.status);
  const [space, setSpace] = useState(props.Space);

  const vehicleSelestionHandler = async () => {
    try {
      const selectVehicleResponse = await contract.selectCarReviewRide(
        props.Id
      );
      const selectVehicleReceipt = await selectVehicleResponse.wait();
      const selectionLogs = selectVehicleReceipt.events?.filter((x) => {
        return x.event === "LogRideInfo";
      });


      const idS = selectionLogs[0].args.carID.toNumber();
      const addS = selectionLogs[0].args.SCarAdd;
      const priceS = selectionLogs[0].args.ridePrice;
      const seatsS= selectionLogs[0].args.freeSpace;
      const statusS = selectionLogs[0].args.Free;


      setSelectedId(idS);
      setSelectedAddress(addS);
      setSelectedPrice(priceS);
      setSelectedSpace(seatsS);
      setSelectedStatus(statusS);

      setSellection(true);

      if (selectionLogs[0].args.freeSpace.toNumber() === 0) {
        return alert("Currently this car is on hold");
      }
    } catch (error) {
      alert(error.error.message);
    }
  };

  return (
    <div>
      <Card className="vehicle-item">
        <div>
          <img src="images/C1.jpg" className="vehicle-item__image" alt="" />
        </div>

        <div className="vehicle-item__card">
          <div>
            {vehicleAdderss}: {props.Address}
          </div>
          <div>
            {vehicleStatus}: {status}
          </div>
          <div>
            {vehicleSpace}: {space}
          </div>

          <div>
            {vehicleID}: {props.Id}
          </div>
        </div>
        <div className="vehicle-item_price">
          <h2>
            {vehiclePrice}: {props.Price}
          </h2>
        </div>

        <button
          onClick={vehicleSelestionHandler}
          className="vehicle-item__button"
        >
          Select Vehicle
        </button>
      </Card>
    </div>
  );
};

export default VehicleItem;
