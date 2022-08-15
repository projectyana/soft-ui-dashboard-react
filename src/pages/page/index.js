/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import Pagination from "components/Custom/Pagination";
import { PageLoading } from "components/Custom/Loading";

import useDebounce from "hooks/useDebounce";

import PageApi from "apis/Page";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ModalDelete from "./components/ModalDelete";

const DropdownButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClickBuilder = () => {
    navigate("editor/create", { state: { type: 'builder' } });
    handleClose();
  };

  const handleClickEditor = () => {
    navigate("editor/create", { state: { type: 'editor' } });
    handleClose();
  };

  return (
    <div>
      <SuiButton
        size="medium"
        color="info"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Create&nbsp;
        <Icon>arrow_drop_down</Icon>
      </SuiButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClickBuilder}>
          <ListItemIcon>
            <Icon size="medium">grid_view</Icon>
          </ListItemIcon>
          &nbsp;Page Builder
        </MenuItem>

        <MenuItem onClick={handleClickEditor}>
          <ListItemIcon>
            <Icon size="medium">format_size</Icon>
          </ListItemIcon>
          &nbsp;Page Editor
        </MenuItem>
      </Menu>
    </div>
  );
};

const PageMenu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "delete",
    show: false,
    data: null
  });
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5, count: 0 });
  const debounceSearch = useDebounce(search, 500);

  const fetchData = () => {
    PageApi.get({
      page: parseInt(pagination.page) + 1,
      per_page: pagination.rowsPerPage,
      search: debounceSearch
    })
      .then((res) => {
        setData(res.data.data ?? []);
        setPagination(prev => ({ ...prev, count: res.data.pagination.total }));
      })
      .catch((err) => window.alert(err.message))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.rowsPerPage, debounceSearch]);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="space-between" alignItems="center">
        <SuiInput placeholder="Search..." icon={{ component: "search", direction: "left" }} onChange={(e) => setSearch(e.target.value ?? "")} />
        <DropdownButton />
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Title</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Slug</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Type</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Tags</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.length > 0 ? data.map((row) => (
              <TableRow key={row.slug} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row?.title}</SuiTypography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.slug}</SuiTypography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.page_type}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row?.tags?.split(",").join(", ")}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="dark"
                        onClick={() => navigate("editor/edit", { state: { ...row, type: row.page_type } })}
                      >
                        <Icon>edit</Icon>&nbsp;edit
                      </SuiButton>
                    </SuiBox>
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="error"
                        onClick={() => setModalConfig({ show: true, type: "delete", data: row })}
                      >
                        <Icon>delete</Icon>&nbsp;delete
                      </SuiButton>
                    </SuiBox>
                  </SuiBox>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <SuiTypography variant="h6">Tidak ada data</SuiTypography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination  */}
      <Pagination
        count={pagination.count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(e, newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        onRowsPerPageChange={(e) => setPagination(prev => ({ ...prev, page: 0, rowsPerPage: parseInt(e.target.value, 10) }))} />

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete setData={setData} fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>);
};

export default PageMenu;