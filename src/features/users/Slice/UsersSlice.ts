import { createSlice } from '@reduxjs/toolkit';

import {listUsers, createUser} from "../Api/users"

export interface IUser{
    id:number;
    firstname:string;
    lastname:string;
    middlename:string;
    isemailverified:string,
    email:string;
    lastlogin:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface IUserState{
    users:IUser|[]|any;
    loading:boolean;
    error:string|null;
}

const initialState:IUserState={
    users:[],
    loading:false,
    error:null
}

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=> {
        // list companies
        builder.addCase(listUsers.pending,(state:IUserState)=>{
            state.loading= false;
            state.error=null;
            state.users=[]
        })

        builder.addCase(listUsers.fulfilled,(state:IUserState, action)=>{
            state.users= action.payload.data.results;
            state.loading= false;
            state.error=null;
        })

        builder.addCase(listUsers.rejected,(state:IUserState)=>{
            state.loading=false;
            state.error=null;
        })

        // create company
        builder.addCase(createUser.pending,(state:IUserState)=>{
            state.loading= false;
            state.error=null;
        })

        builder.addCase(createUser.fulfilled,(state:IUserState, action)=>{
            state.users=[...state.users, action.payload.data];
            state.loading= false;
            state.error=null;
        })

        builder.addCase(createUser.rejected,(state:IUserState)=>{
            state.loading=false;
            state.error=null;
        })
    }
})

export const getAllCompanies = (state: any) => state.company;
export default usersSlice.reducer;