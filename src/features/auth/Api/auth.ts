import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './authService';
import {ILogin} from "../types/IAuth";

export const login = createAsyncThunk('auth/login', async (args:ILogin) => {
    const response = await AuthService.login(args);
    return response;
});


export const getCurrentUser = createAsyncThunk("auth/login",async()=>{
    const response = await AuthService.getCurrentUser();
    return response
})

export const logout = createAsyncThunk("auth/logout",async()=>{
    const response = await AuthService.logout();
    return response
})

export const changePassword= createAsyncThunk("auth/change-password", async (args:any)=>{
    const response = await AuthService.changePassword(args);
    return response
})

export const acceptToken = createAsyncThunk("auth/accept-token", async (args:any)=>{
    const response = await AuthService.acceptToken(args);
    return response
})