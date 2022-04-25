import { lazyImport } from 'utils/lazyImport';

const { Dashboard} = lazyImport(() => import('features/misc'), 'Dashboard');
const {Page404} = lazyImport(()=> import("components/pages/404Page"),"Page404");
const {Login} = lazyImport(()=> import("features/auth"),"Login");
const {EmployeeList} = lazyImport(()=> import("features/employee"),"EmployeeList");
const {CompanyList} = lazyImport(()=> import("features/company"),"CompanyList");
const {AddCompany} = lazyImport(()=> import("features/company"),"AddCompany");

const routes = {
  home: {
    path: '/',
    component: Dashboard,
  },
  login: {
    path: '/login',
    component: Login,
  },
  employee:{
    path:'/employee',
    component:EmployeeList
  },
  company:{
    path:'/company',
    component:CompanyList
  },
  addCompany:{
    path:'/company/add',
    component:AddCompany
  },
  page404:{
    path:"*",
    component:Page404
  }
};

export default routes;