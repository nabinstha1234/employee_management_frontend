import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from "features/auth/Slice/AuthSlice"
import companySlice from "features/company/Slice/CompanySlice";
import userSlice from "features/users/Slice/UsersSlice";
import employeeSlice from "features/employee/slices/EmployeeSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    company:companySlice,
    user:userSlice,
    employee:employeeSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
