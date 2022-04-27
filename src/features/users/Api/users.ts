import { createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from './usersService';

export const listUsers = createAsyncThunk("users/all",async()=>{
    const response = await UsersService.listAll();
    return response
})

export const createUser = createAsyncThunk("users/create",async (args:any)=>{
    const response = await UsersService.create(args);
    return response
})