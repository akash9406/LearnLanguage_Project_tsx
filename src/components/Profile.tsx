import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  // const dispatch = useDispatch();
  const { Authenticated, User } = useSelector(
    (state: { Users: Userinterface }) => state.Users
  );
  if (!Authenticated) return <Navigate to={"/"} />;

  type Langstore = {
    hi: Number;
    es: Number;
    ja: Number;
    fr: Number;
  };

  const [lang, setLang] = useState<Langstore>({
    hi: 0,
    ja: 0,
    es: 0,
    fr: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(
          "http://localhost:8080/api/data/storedata",
          {
            withCredentials: true,
          }
        );
        const word = data.data.word;
        setLang(word);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          marginTop: "10vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">
          Name - {User.firstName} {User.lastName}
        </Typography>
        <Typography variant="h4">Email - {User.email}</Typography>
        <Table sx={{ width: "550px", marginTop: "10vh" }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Hindi</TableCell>
              <TableCell>Japanese</TableCell>
              <TableCell>Spanish</TableCell>
              <TableCell>French</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>"Number of words Learned"</TableCell>
              <TableCell align="center">{lang.hi.toString()}</TableCell>
              <TableCell align="center">{lang.ja.toString()}</TableCell>
              <TableCell align="center">{lang.es.toString()}</TableCell>
              <TableCell align="center">{lang.fr.toString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export default Profile;
