import { lazyImport } from 'utils/lazyImport';

const { Dashboard} = lazyImport(() => import('features/misc'), 'Dashboard');
const {Page404} = lazyImport(()=> import("components/pages/404Page"),"Page404");
const {Login} = lazyImport(()=> import("features/auth"),"Login");

const routes = {
  home: {
    path: '/',
    component: Dashboard,
  },
  login: {
    path: '/login',
    component: Login,
  },
  page404:{
    path:"*",
    component:Page404
  }
};

export default routes;