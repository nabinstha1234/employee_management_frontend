import { createSlice } from '@reduxjs/toolkit';

import {listEmployee, createEmployee} from "../Api/employee"

export interface IEmployee{
    id:number;
    emp_number:string;
    department:string;
    zip_code:string;
    phone:string;
    birthday:Date;
    remarks:string;
    company_id:number;
    user_id:number;
}


export interface IEmployeeState{
    employees:IEmployee|[]|any;
    loading:boolean;
    error:string|null;
}

const initialState:IEmployeeState={
    employees:[],
    loading:false,
    error:null
}

export const employeeSlice = createSlice({
    name:"company",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=> {
        // list companies
        builder.addCase(listEmployee.pending,(state:IEmployeeState)=>{
            state.loading= false;
            state.error=null;
            state.employees=[]
        })
        builder.addCase(listEmployee.fulfilled,(state:IEmployeeState, action)=>{
            state.employees= action.payload.data.results;
            state.loading= false;
            state.error=null;
        })

        builder.addCase(listEmployee.rejected,(state:IEmployeeState)=>{
            state.loading=false;
            state.error=null;
        })

        // create company

        builder.addCase(createEmployee.pending,(state:IEmployeeState)=>{
            state.loading= false;
            state.error=null;
        })
        builder.addCase(createEmployee.fulfilled,(state:IEmployeeState, action)=>{
            state.employees=[...state.employees, action.payload.data];
            state.loading= false;
            state.error=null;
        })
        builder.addCase(createEmployee.rejected,(state:IEmployeeState)=>{
            state.loading=false;
            state.error=null;
        })
    }
})

export const getAllCompanies = (state: any) => state.company;
export default employeeSlice.reducer;