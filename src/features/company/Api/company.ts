import { createAsyncThunk } from '@reduxjs/toolkit';
import CompanyService from './companyService';

export const listCompanies = createAsyncThunk("company/all",async()=>{
    const response = await CompanyService.listAll();
    return response
})

export const createCompany = createAsyncThunk("company/create",async (args:any)=>{
    const response = await CompanyService.create(args);
    return response
})