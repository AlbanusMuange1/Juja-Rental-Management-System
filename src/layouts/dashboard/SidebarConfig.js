// component
import Iconify from '../../components/Iconify';
import {getRole} from "../../utils/common";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

let sidebarConfig = [];
if (getRole()==="Super Admin"){
  sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Users',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Apartments',
    path: '/dashboard/apartments',
    icon: getIcon('ic:sharp-apartment')
  },
  {
    title: 'Houses',
    path: '/dashboard/Houses',
    icon: getIcon('fa6-solid:people-carry-box')
  },
  {
    title: 'view-houses',
    path: '/dashboard/ViewHouses',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Bill',
    path: '/dashboard/Bill',
    icon: getIcon('eva:shopping-bag-fill')
  },
    {
    title: 'Home',
    path: '/home',
    icon: getIcon('eva:shopping-bag-fill')
  },
  /*{
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill')
  },*/
  /*{
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },*/
  /*{
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }*/
];
}else {
  sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },

  {
    title: 'view-houses',
    path: '/dashboard/ViewHouses',
    icon: getIcon('eva:shopping-bag-fill')
  },
    {
    title: 'Home',
    path: '/home',
    icon: getIcon('eva:shopping-bag-fill')
  },
  /*{
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill')
  },*/
  /*{
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },*/
  /*{
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }*/
];
}

console.log(sidebarConfig)



export default sidebarConfig;
