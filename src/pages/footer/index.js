
/**
 * Menu Footer Configuration Page
 */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Paper,
  Icon,
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import CreateButton from "components/Custom/Button/CreateButton";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import ConfigureButton from "components/Custom/Button/ConfigureButton";
import { PageLoading } from "components/Custom/Loading";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import FooterApi from "apis/Footer";
import getRolePermissions from "utils/getRolePermissions";

import ModalCreate from "./components/ModalCreate";
import ModalEditMenu from "./components/ModalEditMenu";
import ModalDelete from "./components/ModalDelete";

import handleOrder from "./helpers/handleOrder";

export default function FooterPage() {
  const { isAllowWrite } = getRolePermissions();
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create", // create | edit | delete | configure
    show: false,
    data: null,
  });
  const [modalCreate, setModalCreate] = useState({ show: false });

  const fetchData = (loading = true) => {
    setFetchStatus({ loading });
    FooterApi.getPage()
      .then((res) => setData(res.data.data ?? []))
      .catch((err) => window.alert(err.message))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    fetchData();

    return () => {
      setData([]);
    };
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
        <CreateButton onClick={() => setModalConfig({ show: true, type: "create" })} />
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            {isAllowWrite && (
              <TableCell>
                <SuiTypography variant="h6">&nbsp;</SuiTypography>
              </TableCell>
            )}
            <TableCell>
              <SuiTypography variant="h6">Menu</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Slug</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.length > 0 ? (
              data?.map((row, index) => (
                <TableRow key={row.name}>
                  {isAllowWrite && (
                    <TableCell>
                      <SuiBox display="flex" justifyContent="start" alignItems="center">
                        <Tooltip title="Change order forward">
                          <SuiButton
                            visibility="hidden"
                            iconOnly
                            circular
                            variant="contained"
                            disabled={index === 0}
                            color="info"
                            size="small"
                            sx={{ marginRight: 1 }}
                            onClick={() => handleOrder({
                              data,
                              setData,
                              index,
                              id: row.id,
                              direction: "up",
                            })}
                          >
                            <Icon>expand_less</Icon>
                          </SuiButton>
                        </Tooltip>

                        <Tooltip title="Change order backward">
                          <SuiButton
                            iconOnly
                            circular
                            variant="contained"
                            disabled={index === data.length - 1}
                            color="warning"
                            size="small"
                            onClick={() => handleOrder({
                              data,
                              setData,
                              index,
                              id: row.id,
                              direction: "down",
                            })}
                          >
                            <Icon>expand_more</Icon>
                          </SuiButton>
                        </Tooltip>
                      </SuiBox>
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    <SuiTypography variant="caption">{row.name}</SuiTypography>
                  </TableCell>
                  <TableCell>
                    <SuiTypography variant="caption">{row.slug}</SuiTypography>
                  </TableCell>
                  <TableCell>
                    <SuiBox display="flex" alignItems="center">
                      <EditButton
                        onClick={() =>
                          setModalConfig({
                            show: true,
                            type: "editMenu",
                            data: row,
                          })
                        }
                      />
                      <DeleteButton
                        onClick={() => setModalConfig({ show: true, type: "delete", data: row })}
                      />
                    </SuiBox>
                  </TableCell>
                </TableRow>
              ))
            ) : (
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
      {
        modalConfig.show && modalConfig.type === "create" && (
          <ModalCreate
            fetchData={fetchData}
            modalConfig={modalConfig}
            setModalConfig={setModalConfig}
            modalCreate={modalCreate}
            setModalCreate={setModalCreate}
          />
        )
      }

      {
        modalConfig.show && modalConfig.type === "editMenu" && (
          <ModalEditMenu
            fetchParent={fetchData}
            modalConfig={modalConfig}
            setModalConfig={setModalConfig}
          />
        )
      }

      {/* Modal Delete */}
      {
        modalConfig.show && modalConfig.type === "delete" && (
          <ModalDelete
            fetchData={fetchData}
            modalConfig={modalConfig}
            setModalConfig={setModalConfig}
          />
        )
      }
    </DashboardLayout >
  );
}
