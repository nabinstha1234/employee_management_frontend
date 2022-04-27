import { createSlice } from '@reduxjs/toolkit';

import {listCompanies, createCompany} from "../Api/company"

export interface ICompany{
    id:number;
    name:string;
    name_kana:string;
    address:string;
    zip_code:string;
    phone:string;
    url_of_hp:string;
    date_of_establishment:string;
    remarks:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface ICompanyState{
    companies:ICompany|[]|any;
    loading:boolean;
    error:string|null;
}

const initialState:ICompanyState={
    companies:[],
    loading:false,
    error:null
}

export const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=> {
        // list companies
        builder.addCase(listCompanies.pending,(state:ICompanyState)=>{
            state.loading= false;
            state.error=null;
            state.companies=[]
        })
        builder.addCase(listCompanies.fulfilled,(state:ICompanyState, action)=>{
            state.companies= action.payload.data.results;
            state.loading= false;
            state.error=null;
        })

        builder.addCase(listCompanies.rejected,(state:ICompanyState)=>{
            state.loading=false;
            state.error=null;
        })

        // create company

        builder.addCase(createCompany.pending,(state:ICompanyState)=>{
            state.loading= false;
            state.error=null;
        })
        builder.addCase(createCompany.fulfilled,(state:ICompanyState, action)=>{
            state.companies=[...state.companies, action.payload.data];
            state.loading= false;
            state.error=null;
        })
        builder.addCase(createCompany.rejected,(state:ICompanyState)=>{
            state.loading=false;
            state.error=null;
        })
    }
})

export const getAllCompanies = (state: any) => state.company;
export default companySlice.reducer;