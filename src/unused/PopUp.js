import "./PopUp.css";

const PopUp = (props) => {

  return (props.trigger) ? (
    <div className="popup">
      <div>
        <button onClick={()=>props.setTrigger(false)}>X</button>
        {props.children}
      </div>
    </div>
  ) : 
    "";
 
};

export default PopUp;

//on Ride <PopUp trigger={triggerHandler}></PopUp>
