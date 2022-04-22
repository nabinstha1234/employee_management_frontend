import { lazyImport } from 'utils/lazyImport';

const { Dashboard} = lazyImport(() => import('../features/misc'), 'Dashboard');

const routes = {
  home: {
    path: '/',
    component: Dashboard,
  },
};

export default routes;