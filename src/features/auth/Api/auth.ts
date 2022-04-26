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