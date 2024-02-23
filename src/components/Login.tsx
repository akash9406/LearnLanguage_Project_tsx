import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { server2 } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import { DoneLogin } from "../redux/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const dispatch = useDispatch();
  const { Authenticated } = useSelector(
    (state: { Users: Userinterface }) => state.Users
  );

  const LoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${server2}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //setting up cookie
      const token = data.data.token;
      Cookie.set("token", token, {
        expires: 1, // Cookie expiration time in days
        secure: true, // Set to true in production
        sameSite: "None", // Set to 'None' for cross-origin requests if using HTTPS
      });

      toast.success(data.data.message);
      dispatch(DoneLogin());
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("unkown axios error");
        }
      } else {
        toast.error("something went wrong");
        console.log(err);
      }
    }
  };

  if (Authenticated) return <Navigate to={"/"} />;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Box
        component="form"
        onSubmit={LoginHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "40vh",
          justifyContent: "space-between",
          margin: "4rem 4rem",
          padding: "2rem",
          boxSizing: "border-box",
          border: "4px solid #C38D9E",
          borderRadius: "5px",
          minWidth: "40vw",
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="input-with-icon-textfield2"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="standard"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          variant="outlined"
        >
          SignUp
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
