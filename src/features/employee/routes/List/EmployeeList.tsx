import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import moment from 'moment';

import { Page, ReactIcon, ScrollBar, FormDialog } from 'components/molecules';
import { SearchNotFound, ListToolbar, ListHead, MoreMenu } from 'components/organisms';
import { applySortFilter, getComparator } from 'utils/sortFilter';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { listEmployee } from 'features/employee/Api/employee';
import { RootState } from 'app/store';

import { AddEmployee } from '../Create';
import config from '../../../../config';

type Props = {};

const TABLE_HEAD = [
  { id: 'name', label: 'Employee Id', alignRight: false },
  { id: 'employee_id', label: 'Employee Number', alignRight: false },
  { id: 'department', label: 'Department', alignRight: false },
  { id: 'zip_code', label: 'Zip Code', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'birthday', label: 'Birth Day', alignRight: false },
  { id: 'remarks', label: 'Remarks', alignRight: false },
  { id: '' },
];

const EmployeeList = (props: Props) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDialog, setShowDialog] = useState(false);
  const { employees } = useAppSelector((state: RootState) => state.employee);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listEmployee());
  }, [dispatch]);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n: any) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const filteredUsers = applySortFilter(employees, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleMenuItemClick = (id: number, type: string) => {
    if (type === config.menuType.edit) {
    }
    if (type === config.menuType.delete) {
    }
  };

  return (
    <Page title="Employee">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employee
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowDialog(true)}
            startIcon={<ReactIcon icon="eva:plus-fill" />}
          >
            New Employee
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
                  rowCount={employees.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const {
                        id,
                        emp_number,
                        department,
                        zip_code,
                        address,
                        phone,
                        birthday,
                        remarks,
                      } = row;
                      const isItemSelected = selected.indexOf(emp_number as never) !== -1;

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
                              onChange={(event) => handleClick(event, employees)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{emp_number}</TableCell>
                          <TableCell align="left">{department}</TableCell>
                          <TableCell align="left">{zip_code}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">
                            {birthday && moment(birthday).format('yyyy-mm-dd')}
                          </TableCell>
                          <TableCell align="left">{remarks}</TableCell>
                          <TableCell align="right">
                            <MoreMenu onClick={handleMenuItemClick} id={id} />
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
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {showDialog && (
        <FormDialog show={showDialog} setShow={setShowDialog} title="Add New Employee">
          <AddEmployee />
        </FormDialog>
      )}
    </Page>
  );
};

export default EmployeeList;
