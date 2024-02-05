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
       }
     }
})

     export const {NotLogin,DoneLogin,setUser} = userSlice.actions

    export default userSlice.reducer;
    