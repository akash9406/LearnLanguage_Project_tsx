import { AccountCircle } from "@mui/icons-material"
import { Box, Button, Container, InputAdornment,  TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
   const navigate = useNavigate()
   const [email,setEmail] = useState<String>('')
   const [password,setPassword] = useState<String>('')

   const LoginHandler = async(e:React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       console.log(email)
       console.log(password)        
   } 
   return (
    <Container sx={{
      display: "flex",
      justifyContent:"center",
      alignItems: "center",
      minHeight: "70vh",
    }}>
      <Box 
        component="form"
        onSubmit={LoginHandler}
      sx={{
        display: "flex",
        flexDirection:"column",
        minHeight: "40vh",
        justifyContent: "space-between",
        margin: "4rem 4rem",
        padding: "2rem",
        boxSizing: "border-box",
        border: "4px solid #C38D9E",
        borderRadius: "5px",
        minWidth: "40vw"
      }}  
      >
        <TextField
        id="input-with-icon-textfield"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
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
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        variant="standard"
      />
      <Button
        type="submit"
      variant="contained">
        Login
      </Button>
      <Button onClick={()=>{navigate("/signup")}} variant="outlined">
        SignUp
      </Button>
      </Box>
    </Container>
  )
}

export default Login