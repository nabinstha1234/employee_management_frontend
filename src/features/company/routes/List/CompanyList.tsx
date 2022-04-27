import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

import { RootState } from 'app/store';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { Page, ReactIcon, ScrollBar, FormDialog } from 'components/molecules';
import { SearchNotFound, ListToolbar, ListHead, MoreMenu } from 'components/organisms';
import { applySortFilter, getComparator } from 'utils/sortFilter';

import { AddCompany } from '../Create';
import { listCompanies } from 'features/company/Api/company';
import config from 'config';

type Props = {};

const TABLE_HEAD = [
  { id: 'id', label: 'Company ID', alignRight: false },
  { id: 'name', label: 'Company Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'date_of_establishment', label: 'Date Of Establishment', alignRight: false },
  { id: 'remarks', label: 'Remarks', alignRight: false },
  { id: '' },
];

const CompanyList = (props: Props) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showDialog, setShowDialog] = useState(false);
  const { companies } = useAppSelector((state: RootState) => state.company);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(listCompanies());
    return controller.abort();
  }, [dispatch]);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = companies.map((n: any) => n.name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companies.length) : 0;

  const filteredUsers = applySortFilter(companies, getComparator(order, orderBy), filterName);

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
            Companies
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              history.push('/company/add');
            }}
            startIcon={<ReactIcon icon="eva:plus-fill" />}
          >
            New Company
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
                  rowCount={companies.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const { id, name, address, email, phone, date_of_establishment, remarks } =
                        row;
                      const isItemSelected = selected.indexOf(name as never) !== -1;

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
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell align="left">{id}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{date_of_establishment}</TableCell>
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
            count={companies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {showDialog && (
        <FormDialog show={showDialog} setShow={setShowDialog} title="Add New Employee">
          <AddCompany />
        </FormDialog>
      )}
    </Page>
  );
};

export default CompanyList;
