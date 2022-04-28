import { lazyImport } from 'utils/lazyImport';

const { Dashboard} = lazyImport(() => import('features/misc'), 'Dashboard');
const {Page404} = lazyImport(()=> import("components/pages/404Page"),"Page404");
const {Login} = lazyImport(()=> import("features/auth"),"Login");
const {EmployeeList} = lazyImport(()=> import("features/employee"),"EmployeeList");
const {CompanyList} = lazyImport(()=> import("features/company"),"CompanyList");
const {AddCompany} = lazyImport(()=> import("features/company"),"AddCompany");
const {UsersList} = lazyImport(()=> import("features/users"),"UsersList");
const {ChangePassword} = lazyImport(()=> import("features/auth"),"ChangePassword");
const {AcceptInvitation} = lazyImport(()=> import("features/auth"),"AcceptInvitation");

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
  users:{
    path:"/users",
    component:UsersList
  },
  passwordChange:{
    path:"/password-change",
    component:ChangePassword
  },
  acceptInvitation:{
    path:"/invite/verify/:token",
    component:AcceptInvitation
  },
  page404:{
    path:"*",
    component:Page404
  }
};

export default routes;