/* eslint-disable */

/**
 * Create Parent Sub Menu
 */

import { useEffect, useState } from "react";
import Axios from "axios";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { LoadingState } from "components/Custom/Loading";

// @mui material components
import {
  Chip,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

import MenuApi from "apis/Menu";
import CustomModal from "components/Custom/Modal";

const ModalConfigure = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, name, } = modalConfig.data;
  const [onRowDelete, setOnRowDelete] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({ loading: false });
  const [submenu, setSubmenu] = useState([]);

  // Get sub parent menu list
  const fetchParent = () => {
    setFetchStatus({ loading: true });
    MenuApi.getSingleParent(id)
      .then((res) => setSubmenu(res?.data?.data?.content ?? []))
      .finally(() => setFetchStatus({ loading: false }));
  };

  const handleDeleteMenu = (id) => {
    MenuApi.delete(id)
      .then(() => setSubmenu(submenu.filter((item) => item.id !== id)))
      .catch(() => window.alert('Error connect to server'));
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
                          <SuiBox display="flex" justifyContent="center" alignItems="center">
                            <Chip size="small" label="Cancel" variant="outlined" onClick={() => setOnRowDelete(null)} />
                            <Chip sx={{ marginLeft: 1 }} size="small" label="Confirm" color="error" onClick={() => handleDeleteMenu(row.id)} />
                          </SuiBox>
                        )
                        : (
                          <SuiButton
                            size="small"
                            variant="text"
                            color="error"
                            onClick={() => setOnRowDelete(row.id)}
                          >
                            <Icon>delete</Icon>&nbsp;delete
                          </SuiButton>
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
    </CustomModal >
  );
};

export default ModalConfigure;
