import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo">
      <div>
        <img src="images/logo.png" className="logo__image" alt="" />
      </div>
      <p className="logo__p"> AvCollective </p>
    </div>
  );
};

export default Logo;
