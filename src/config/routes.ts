import { lazyImport } from 'utils/lazyImport';

const { Dashboard} = lazyImport(() => import('features/misc'), 'Dashboard');
const {Page404} = lazyImport(()=> import("components/pages/404Page"),"Page404")

const routes = {
  home: {
    path: '/',
    component: Dashboard,
  },
  page404:{
    path:"*",
    component:Page404
  }
};

export default routes;