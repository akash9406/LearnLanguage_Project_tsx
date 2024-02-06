import { Button, Container, Stack, Typography } from "@mui/material";
// import { useEffect } from "react";
// import { server } from "../main";
// import axios from "axios";
// import { DoneLogin, NotLogin, removeUser, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const languagaes = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];
const Home = () => {
  const navigate = useNavigate();
  const languageSelectHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };
  // const dispatch = useDispatch();
  const { Authenticated, User } = useSelector(
    (state: { Users: Userinterface }) => state.Users
  );

  // useEffect(() => {
  //   axios
  //     .get(`${server}/me`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       dispatch(DoneLogin());
  //       dispatch(setUser(res.data.user));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       dispatch(NotLogin());
  //       dispatch(removeUser());
  //     });
  // }, []);

  return (
    <Container maxWidth={"sm"}>
      {Authenticated ? (
        <Typography variant="h3" p={"2rem"} textAlign={"center"}>
          Welcome {User.firstName}, Begin your journey of learning.
        </Typography>
      ) : (
        <Typography variant="h3" p={"2rem"} textAlign={"center"}>
          Welcome Guest, Begin your journey of learning.
        </Typography>
      )}
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languagaes.map((i) => (
          <Button onClick={() => languageSelectHandler(i.code)} key={i.code}>
            {i.name}
          </Button>
        ))}
      </Stack>
      <Typography textAlign={"center"}>
        Choose one language from above
      </Typography>
    </Container>
  );
};

export default Home;
