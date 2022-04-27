import { filter } from 'lodash';

export const descendingComparator=(a: any, b: any, orderBy: any)=> {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  

export const getComparator = (order: any, orderBy: any) => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };


export const applySortFilter = (array: any, comparator: any, query: any) => {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.hasOwnProperty("name")?_user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1:_user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el: any) => el[0]);
  };