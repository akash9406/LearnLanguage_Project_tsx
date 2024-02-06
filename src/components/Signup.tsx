import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Cookie from "js-cookie";
import React, { useState } from "react";
import { server } from "../main";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { DoneLogin } from "../redux/userSlice";
const Signup = () => {
  const [firstname, setFirstname] = useState<String>("");
  const [lastname, setLastname] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const dispatch = useDispatch();
  const { Authenticated } = useSelector(
    (state: { Users: Userinterface }) => state.Users
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${server}/signup`,
        {
          firstName: firstname,
          lastName: lastname,
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
        expires: 1,
        secure: true,
      });

      toast.success(data.data.message);
      //updating redux
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
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 3,
          }}
          onSubmit={submitHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
