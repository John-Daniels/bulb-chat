import "./Logout.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { profileLogoutAction } from "../../store/profile.slice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(profileLogoutAction());
    navigate("/login");
  };

  return (
    <div id="logout" onClick={handleClick}>
      <BiPowerOff />
    </div>
  );
};

export default Logout;
