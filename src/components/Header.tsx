import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { NotLogin, removeUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const styles = {
  color: "white",
  margin: "0.5rem",
  textDecoration: "none",
  ":hover": {
    color: "orange",
  },
};
const Header = () => {
  const dispatch = useDispatch();
  const { Authenticated } = useSelector(
    (state: { Users: Userinterface }) => state.Users
  );

  const Logouthandler = () => {
    try {
      dispatch(NotLogin());
      dispatch(removeUser());
      Cookies.remove("token");
      toast.success("logout done");
      ///have to make logout function
      //https://www.geeksforgeeks.org/how-to-create-a-ripple-effect-on-click-the-button/
    } catch (error) {
      toast.error("failed to logout");
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" mr={"auto"} textTransform={"uppercase"}>
          Learndo.
        </Typography>
        <Link style={styles} to={"/"}>
          Home
        </Link>
        {Authenticated && (
          <Link style={styles} to={"/profile"}>
            Profile
          </Link>
        )}
        {Authenticated ? (
          <Button
            variant="outlined"
            sx={{
              color: "white",
            }}
            onClick={Logouthandler}
          >
            Logout
          </Button>
        ) : (
          <Link style={styles} to={"/login"}>
            Login
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
