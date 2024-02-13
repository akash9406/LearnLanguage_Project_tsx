import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Userinterface = {
     Authenticated: false,
     User: {  
       firstName: '',
       lastName: '',
       email: '',
     },
     languageData: ""
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
               lastName: "",
               email:"",
           }
       },
       storeLang: (state,action:PayloadAction<String>) => {
             state.languageData = action.payload
       } 
     }
})

     export const {NotLogin,DoneLogin,setUser,removeUser,storeLang} = userSlice.actions

    export default userSlice.reducer;
    