/**
 * Role Page
 */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import CreateButton from "components/Custom/Button/CreateButton";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import ConfigureButton from "components/Custom/Button/ConfigureButton";
import { PageLoading } from "components/Custom/Loading";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import RoleApi from "apis/Role";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalConfigure from "./components/ModalConfigure";
import ModalDelete from "./components/ModalDelete";

export default function RolePage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create | edit | delete | configure
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    RoleApi.get()
      .then((res) => setData(res.data.data ?? []))
      .catch((err) => window.alert(err.message))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    fetchData();

    return () => { setData([]); };
  }, []);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        <CreateButton onClick={() => setModalConfig({ show: true, type: 'create' })} />
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Code</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Name</SuiTypography>
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
              <TableRow key={row.code} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.code}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.name}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.description}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <ConfigureButton onClick={() => setModalConfig({ show: true, type: "configure", data: row })} />
                    <EditButton onClick={() => setModalConfig({ show: true, type: "edit", data: row })} />
                    <DeleteButton onClick={() => setModalConfig({ show: true, type: "delete", data: row })} />
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

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Configure */}
      {modalConfig.show && modalConfig.type === "configure" && <ModalConfigure fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>
  );
}
