import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FormDialog, Page, ReactIcon, ScrollBar } from 'components/molecules';
import { ListHead, ListToolbar, MoreMenu, SearchNotFound } from 'components/organisms';
import { applySortFilter, getComparator } from 'utils/sortFilter';

import { AddUser } from '../Create';
import { listUsers } from 'features/users/Api/users';
import config from '../../../../config';

type Props = {};

const TABLE_HEAD = [
  { id: 'id', label: 'User Id', alignRight: false },
  { id: 'name', label: 'Full Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'lastlogin', label: 'Last Login', alignRight: false },
  { id: '' },
];

const UsersList = (props: Props) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDialog, setShowDialog] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { users } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(listUsers());
    return controller.abort();
  }, [dispatch]);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: number) => {
    const selectedIndex = selected.indexOf(name as never);
    let newSelected: number[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleMenuItemClick = (id: number, type: string) => {
    if (type === config.menuType.edit) {
      const user = users.find((item: any) => item.id === id);
      const { firstname, middlename, lastname, email, role, company } = user;
      setDefaultValues({
        firstname,
        middlename,
        lastname,
        email,
        role,
        company,
      });
      setIsEditing(true);
      setShowDialog(true);
    }

    if (type === config.menuType.delete) {
    }
  };
  return (
    <Page title="Users">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setShowDialog(true);
            }}
            startIcon={<ReactIcon icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <ScrollBar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const { id, firstname, lastname, middlename, lastlogin, email, role } = row;
                      const isItemSelected = selected.indexOf(firstname as never) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, firstname)}
                            />
                          </TableCell>
                          <TableCell align="left">{id}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {firstname} {middlename} {lastname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">
                            {moment(lastlogin).format('yyyy-mm-DD')}
                          </TableCell>
                          <TableCell align="right">
                            <MoreMenu id={id} onClick={handleMenuItemClick} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </ScrollBar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {showDialog && (
        <FormDialog show={showDialog} setShow={setShowDialog} title="Add New User">
          <AddUser defaultValues={isEditing ? defaultValues : {}} setShowDialog={setShowDialog} />
        </FormDialog>
      )}
    </Page>
  );
};

export default UsersList;
