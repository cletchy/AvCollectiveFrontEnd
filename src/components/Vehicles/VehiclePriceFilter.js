import "./VehiclePriceFilter.css";

const VehiclePriceFilter = (props) => {
  const dropDownHandler = (event) => {
    props.onChangeFilter(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="vehicles-filter">
      <div className="vehicles-filter__control">
        <label> Filter by Price </label>
        <select value={props.selected} onChange={dropDownHandler}>
          <option value="0.0020">0.0020 </option>
          <option value="0.0025"> 0.0025</option>
          <option value="0.0030">0.0030</option>
          <option value="0.0035">0.0035 </option>
        </select>
      </div>
    </div>
  );
};

export default VehiclePriceFilter;
