import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Userinterface = {
     Authenticated: false,
     User: {  
       firstName: '',
       LastName: '',
       email: '',
     },
}

const  userSlice  = createSlice({
     name: "user",
     initialState,
     reducers: {
       NotLogin:(state) => {
           state.Authenticated = false;
       },
       DoneLogin :(state) => {
             state.Authenticated = true;
       },
       setUser: (state,action:PayloadAction<usertype>)=>{
            state.User = action.payload;
       },
       removeUser: (state)=> {
           state.User = {
               firstName: "",
               LastName: "",
               email:"",
           }
       }
     }
})

     export const {NotLogin,DoneLogin,setUser,removeUser} = userSlice.actions

    export default userSlice.reducer;
    