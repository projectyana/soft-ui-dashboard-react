/* eslint-disable */

/**
 * Press Release Page
 */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon
} from "@mui/material";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import Pagination from "components/Custom/Pagination";
import { PageLoading } from "components/Custom/Loading";

import useDebounce from "hooks/useDebounce";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import PresReleaseApi from "apis/PressRelease";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

const sliceText = (text, length) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export default function PressReleasePage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create | edit | delete | configure
    show: false,
    data: null
  });
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5, count: 0 });
  const debounceSearch = useDebounce(search, 500);

  const fetchData = () => {
    PresReleaseApi.get({
      page: parseInt(pagination.page) + 1,
      per_page: pagination.rowsPerPage,
      search: debounceSearch
    })
      .then((res) => {
        setData(res.data.data ?? []);
        setPagination(prev => ({ ...prev, count: res.data.pagination.total }));
      })
      .catch((err) => window.alert(err.message ?? "Error connect to server!"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    fetchData();

    return () => { setData([]); };
  }, [pagination.page, pagination.rowsPerPage, debounceSearch]);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="space-between" alignItems="center">
        <SuiBox display="flex">
          <SuiInput placeholder="Search..." icon={{ component: "search", direction: "left" }} onChange={(e) => setSearch(e.target.value ?? "")} />
          <SuiButton sx={{ marginLeft: 2 }} size="medium" color="warning" >
            Export
          </SuiButton>

        </SuiBox>
        <SuiButton size="medium" color="info" onClick={() => setModalConfig({ show: true, type: 'create' })}>
          Create
        </SuiButton>
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Title</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Category</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Slug</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Description</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.length > 0 ? data.map((row) => (
              <TableRow key={row.title} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.title}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row?.category}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.slug}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{sliceText(row.description, 165)}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="dark"
                        onClick={() => setModalConfig({ show: true, type: "edit", data: row })}
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
                  <SuiTypography variant="h6">No data</SuiTypography>
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

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>
  );
}
