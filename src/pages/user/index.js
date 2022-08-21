/* eslint-disable */

/**
 * User Page
 */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon,
} from "@mui/material";
import Axios from "axios";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import CreateButton from "components/Custom/Button/CreateButton";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import { PageLoading } from "components/Custom/Loading";

import UserApi from "apis/User";
import RoleApi from "apis/Role";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

export default function UserPage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: 'create',    // create | edit 
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    Axios.all([UserApi.get(), RoleApi.get()])
      .then((Axios.spread((resUser, resRoles) => {
        const mapRoles = resRoles.data.data.map(({ id, name }) => ({ value: id, label: name }));

        setData(resUser.data.data ?? []);
        setRoles(mapRoles ?? []);
      })))
      .catch(() => window.alert('Error connect to server'))
      .finally(() => setFetchStatus(false));
  };

  useEffect(() => {
    fetchData();

    return () => {
      setData([]);
      setRoles([]);
    };
  }, []);


  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        <CreateButton onClick={() => setModalConfig({ type: 'create', show: true })} />
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Name</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Role</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Username</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Email</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.name}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row?.role?.name}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.username}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.email}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <EditButton onClick={() => setModalConfig({ show: true, type: 'edit', data: row })} />
                    <DeleteButton onClick={() => setModalConfig({ show: true, type: 'delete', data: row })} />
                  </SuiBox>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate
        fetchData={fetchData}
        roles={roles}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit
        fetchData={fetchData}
        roles={roles}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete
        fetchData={fetchData}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig} />}
    </DashboardLayout>
  );
}
