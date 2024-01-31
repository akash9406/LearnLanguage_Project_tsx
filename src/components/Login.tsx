import { AccountCircle } from "@mui/icons-material"
import { Box, Button, Container, FormControl, Input, InputAdornment, InputLabel, TextField } from "@mui/material"

const Login = () => {
  return (
    <Container sx={{
      display: "flex",
      justifyContent:"center",
      alignItems: "center",
      minHeight: "70vh"
    }}>
      <Box sx={{
        display: "flex",
        flexDirection:"column",
        minHeight: "40vh",
        justifyContent: "space-between",
        margin: "4rem 4rem",
        padding: "2rem",
        boxSizing: "border-box",
        border: "4px solid #C38D9E",
        borderRadius: "5px",
        width: "40vw"
      }}>
        <TextField
        id="input-with-icon-textfield"
        label="Username"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
       <TextField
        id="input-with-icon-textfield"
        label="Password"
        variant="standard"
      />
      <Button variant="contained">
        Login
      </Button>
      </Box>
    </Container>
  )
}

export default Login