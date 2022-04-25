import { ReactIcon } from 'components/molecules';

const getIcon = (name: string) => <ReactIcon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Company Management',
    path: '/company',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Employee Management',
    path: '/employee',
    icon: getIcon('eva:people-fill'),
  },
];

export default sidebarConfig;
