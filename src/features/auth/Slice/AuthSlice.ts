import { createSlice } from '@reduxjs/toolkit';

import {getCurrentUser} from "../Api/auth"

export interface IUser{
    id:number;
    firstname:string;
    lastname:string;
    middlename:string;
    email:string;
    lastlogin:Date;
    profile_img:string;
    role:string;
}

export interface IAuthState{
    userResponse:IUser|{}|any;
    loading:boolean;
    error:string|null;
}

const initialState:IAuthState={
    userResponse:{},
    loading:false,
    error:null
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state)=>{

        }
    },
    extraReducers:(builder)=> {
        builder.addCase(getCurrentUser.pending,(state:IAuthState)=>{
            state.loading= false;
            state.error=null;
        })
        builder.addCase(getCurrentUser.fulfilled,(state:IAuthState, action)=>{
            state.userResponse= action.payload.data;
            state.loading= false;
            state.error=null;
        })

        builder.addCase(getCurrentUser.rejected,(state:IAuthState)=>{
            state.loading=false;
            state.error=null;
        })
    }
})

export const getAllBooks = (state: any) => state.auth;
export default authSlice.reducer;