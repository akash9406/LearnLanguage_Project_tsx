import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { DoneLogin, NotLogin, removeUser, setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../main";

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

  useEffect(() => {
    axios
      .get(`${server}/me`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(DoneLogin());
        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        console.log(err);
        dispatch(NotLogin());
        dispatch(removeUser());
      });
  }, [Authenticated]);

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
