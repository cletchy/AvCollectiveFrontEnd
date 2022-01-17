import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

import "./User.css";

const User = () => {
  const { handleUser, seat, seatStatus } = useContext(TransactionContext);

  return (
    <div className="newUser">
      <div className="newUser__control">
        <h2>Step 1</h2>
        {seatStatus && <h3>Seat selection of {seat} is confirmed!</h3>}
        <p>Select the number of seats you require:</p>
        <select onChange={handleUser}>
          <option value="0"> 0 </option>
          <option value="1"> 1 </option>
          <option value="2"> 2</option>
          <option value="3">3</option>
          <option value="4">4 </option>
        </select>
      </div>
    </div>
  );
};

export default User;
