
/**
 * Menu Header Configuration Page
 */

import React, { useEffect, useState } from "react";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiPagination from "components/SuiPagination";
import SuiTypography from "components/SuiTypography";

// @mui material components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon
} from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { PageLoading } from "components/Custom/Loading";

import MenuApi from "apis/Menu";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalConfigure from "./components/ModalConfigure";
import ModalDelete from "./components/ModalDelete";
import ModalCreatePage from "./components/ModalCreatePage";

export default function RolePage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create | edit | delete | configure
    show: false,
    data: null
  });
  const [modalCreate, setModalCreate] = useState({ show: false });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    MenuApi.getParent()
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
        {/* <SuiInput placeholder="Type here..." icon={{ component: "search", direction: "left" }} /> */}
        <SuiButton size="medium" color="info" onClick={() => setModalConfig({ show: true, type: 'create' })}>
          Create
        </SuiButton>
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Menu</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Slug</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Sub Menu</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.length > 0 ? data.map((row) => (
              <TableRow key={row.name} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.name}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.slug}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">
                    {row.sub_header_navs?.length > 0 && (
                      <ul>
                        {row.sub_header_navs.map((sub) => (<li key={sub.slug}> {sub.name} {sub.url ? `| ${sub.url}` : ""}</li>))}
                      </ul>
                    )}
                  </SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="info"
                        onClick={() => setModalConfig({ show: true, type: "configure", data: row })}
                      >
                        <Icon>settings</Icon>&nbsp;configure
                      </SuiButton>
                    </SuiBox>
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
                  <SuiTypography variant="h6">Tidak ada data</SuiTypography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} modalCreate={modalCreate} setModalCreate={setModalCreate} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Configure */}
      {modalConfig.show && modalConfig.type === "configure" && <ModalConfigure fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Create */}
      {modalCreate.show && <ModalCreatePage modalCreate={modalCreate} setModalCreate={setModalCreate} />}
    </DashboardLayout>
  );
}
