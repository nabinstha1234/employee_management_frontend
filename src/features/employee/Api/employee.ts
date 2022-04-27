import { createAsyncThunk } from '@reduxjs/toolkit';
import EmployeeService from './employeeService';

export const listEmployee = createAsyncThunk("company/all",async()=>{
    const response = await EmployeeService.listAll();
    return response
})

export const createEmployee = createAsyncThunk("company/create",async (args:any)=>{
    const response = await EmployeeService.create(args);
    return response
})