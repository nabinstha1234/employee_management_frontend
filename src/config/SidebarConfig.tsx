import {ReactIcon} from 'components/molecules';
import config from "config"

const getIcon = (name: string) => <ReactIcon icon={name} width={22} height={22}/>;

const {
    roles: {Admin, SuperAdmin, Employee}
} = config;

const allRole = [SuperAdmin, Admin, Employee]

const sidebarConfig = [
    {
        title: 'Dashboard',
        path: '/',
        icon: getIcon('eva:pie-chart-2-fill'),
        roles: allRole
    },
    {
        title: 'Company Management',
        path: '/company',
        icon: getIcon('eva:shopping-bag-fill'),
        roles: [SuperAdmin]
    },
    {
        title: 'Employee Management',
        path: '/employee',
        icon: getIcon('eva:people-fill'),
        roles: allRole
    },
    {
        title: "Users Management",
        path: "/users",
        icon: getIcon('eva:people-fill'),
        roles: [SuperAdmin]
    }
];

export default sidebarConfig;
