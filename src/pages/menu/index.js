
/**
 * Menu Header Configuration Page
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

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import CreateButton from "components/Custom/Button/CreateButton";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import ConfigureButton from "components/Custom/Button/ConfigureButton";
import { PageLoading } from "components/Custom/Loading";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import MenuApi from "apis/Menu";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalEditMenu from "./components/ModalEditMenu";
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
  const [modalCreate, setModalCreate] = useState({ show: false });

  const fetchData = (loading = true) => {
    setFetchStatus({ loading });

    MenuApi.getParent()
      .then((res) => setData(res.data.data ?? []))
      .catch((err) => window.alert(err.message))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    fetchData();

    return () => { setData([]); };
  }, []);

  useEffect(() => {
    // refetch data on modal configure close
    if (modalConfig.type === "configure" && !modalConfig.show) {
      fetchData(false);
    }
  }, [modalConfig]);

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
                    <SuiBox mr={1} sx={{ visibility: row.sub_header_navs.length > 0 ? "visible" : "hidden" }}>
                      <ConfigureButton onClick={() => setModalConfig({ show: true, type: "configure", data: row })} />
                    </SuiBox>
                    <EditButton onClick={() => setModalConfig({ show: true, type: row.type === "parent" ? "edit" : "editMenu", data: row })} />
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
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate
        fetchData={fetchData}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig}
        modalCreate={modalCreate}
        setModalCreate={setModalCreate}
      />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit
        fetchData={fetchData}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig}
      />}

      {modalConfig.show && modalConfig.type === "editMenu" &&
        <ModalEditMenu
          fetchParent={fetchData}
          modalConfig={modalConfig}
          setModalConfig={setModalConfig}
        />}

      {/* Modal Configure */}
      {modalConfig.show && modalConfig.type === "configure" && <ModalConfigure
        fetchPage={fetchData}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig}
      />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete
        fetchData={fetchData}
        modalConfig={modalConfig}
        setModalConfig={setModalConfig}
      />}
    </DashboardLayout>
  );
}
