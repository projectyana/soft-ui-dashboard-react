/* eslint-disable */

/**
 * Modal to Edit or delete Submenu from Parent
 */

import { useEffect, useState } from "react";
import {
  Chip,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Paper,
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { LoadingState } from "components/Custom/Loading";

import handleOrder from "../helpers/handleOrder";

import MenuApi from "apis/Menu";
import CustomModal from "components/Custom/Modal";
import ModalEditMenu from "./ModalEditMenu";

const ModalConfigure = ({ fetchPage, modalConfig, setModalConfig }) => {
  const { id, name, } = modalConfig.data;
  const [onRowDelete, setOnRowDelete] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({ loading: false });
  const [submenu, setSubmenu] = useState([]);
  const [modalEditMenu, setModalEditMenu] = useState({ show: false, data: null });

  // Get sub parent menu list
  const fetchParent = () => {
    setFetchStatus({ loading: true });
    MenuApi.getSingle(id)
      .then((res) => setSubmenu(res?.data?.data?.content?.sort((a, b) => a.order - b.order) ?? []))
      .finally(() => setFetchStatus({ loading: false }));
  };

  const handleDeleteMenu = (id) => {
    MenuApi.delete(id)
      .then(() => setSubmenu(submenu.filter((item) => item.id !== id)))
      .catch(() => window.alert('Error connect to server'))
      .finally(() => {
        setTimeout(() => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchPage();
        }, 300);
      });
  };

  useEffect(() => {
    fetchParent();

    return () => { };
  }, []);

  return (
    <CustomModal
      title={`${name} Configuration`}
      open={modalConfig.show && modalConfig.type === 'configure'}
      setModalConfig={setModalConfig}
    >
      {fetchStatus.loading
        ? <LoadingState />
        : <SuiBox mb={2}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableRow>
                <TableCell>
                  <SuiTypography variant="h6">&nbsp;</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="h6">Sub Menu</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="h6">Slug</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="h6">Type</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="h6">Action</SuiTypography>
                </TableCell>
              </TableRow>
              <TableBody>
                {submenu?.length > 0 ? submenu.map((row, index) => (
                  <TableRow key={row.name} >
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
                              index,
                              id: row.id,
                              direction: "up",
                              data: submenu,
                              setData: setSubmenu
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
                            disabled={index === submenu.length - 1}
                            color="warning"
                            size="small"
                            onClick={() => handleOrder({
                              index,
                              id: row.id,
                              direction: "down",
                              data: submenu,
                              setData: setSubmenu
                            })}
                          >
                            <Icon>expand_more</Icon>
                          </SuiButton>
                        </Tooltip>
                      </SuiBox>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <SuiTypography variant="caption">
                        {row.type === "link" ? `${row.name} (${row.url})` : row.name}
                      </SuiTypography>
                    </TableCell>
                    <TableCell>
                      <SuiTypography variant="caption">{row.slug}</SuiTypography>
                    </TableCell>
                    <TableCell>
                      <SuiTypography variant="caption">{row.type ?? ""}</SuiTypography>
                    </TableCell>
                    <TableCell>
                      {onRowDelete === row.id
                        ? (
                          <SuiBox display="flex" justifyContent="start" alignItems="center">
                            <Chip size="small" label="Cancel" variant="outlined" onClick={() => setOnRowDelete(null)} />
                            <Chip sx={{ marginLeft: 1 }} size="small" label="Confirm" color="error" onClick={() => handleDeleteMenu(row.id)} />
                          </SuiBox>
                        )
                        : (
                          <SuiBox display="flex" justifyContent="start" alignItems="center">
                            <SuiBox mr={1}>
                              <SuiButton
                                size="small"
                                variant="text"
                                color="dark"
                                onClick={() => setModalEditMenu({ show: true, data: row })}
                              >
                                <Icon>edit</Icon>&nbsp;edit
                              </SuiButton>
                            </SuiBox>
                            <SuiBox>
                              <SuiButton
                                size="small"
                                variant="text"
                                color="error"
                                onClick={() => setOnRowDelete(row.id)}
                              >
                                <Icon>delete</Icon>&nbsp;delete
                              </SuiButton>
                            </SuiBox>
                          </SuiBox>
                        )}
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
        </SuiBox>
      }
      {/* Modal edit sub menu */}
      {modalEditMenu.show && <ModalEditMenu fetchParent={fetchParent} modalConfig={modalEditMenu} setModalConfig={setModalEditMenu} />}
    </CustomModal >
  );
};

export default ModalConfigure;
