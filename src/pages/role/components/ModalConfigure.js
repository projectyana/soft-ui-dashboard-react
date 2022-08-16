/* eslint-disable */

/**
 * Configure Role access
 */

import { useEffect, useState } from "react";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

import { LoadingState } from "components/Custom/Loading";

// @mui material components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox
} from "@mui/material";

import RoleApi from "apis/Role";
import CustomModal from "components/Custom/Modal";

const ModalConfigure = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, name, } = modalConfig.data;
  const [fetchStatus, setFetchStatus] = useState({ loading: false });
  const [data, setData] = useState([]);

  // Fetch data from server
  const getInitialData = () => {
    setFetchStatus({ loading: true });

    RoleApi.getRoleAccess(id)
      .then((res) => setData(res.data.data ?? []))
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  // Handle Change / toggle permission 
  const handleChange = (val, ability) => {
    setData(() => data.map((item) => (item.id === val.id ? {
      ...item,
      abilities: {
        ...item.abilities,
        [ability]: !item.abilities[ability]
      }
    }
      : item))
    );
  };

  // Handle Submit to Server
  const handleSubmit = () => {
    const finalValue = { access_id: {} };

    // map data to final value
    data?.forEach((item) => finalValue.access_id[item.id] = item.abilities);

    // Submit to server
    RoleApi.setRoleAccess(id, finalValue)
      .then(() => { setModalConfig((prev) => ({ ...prev, show: false })); })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  useEffect(() => {
    getInitialData();

    return () => setData([]);
  }, []);

  return (
    <CustomModal
      title={`${name} Configuration`}
      open={modalConfig.show && modalConfig.type === 'configure'}
      setModalConfig={setModalConfig}
    >
      {
        fetchStatus.loading
          ? <LoadingState />
          : <SuiBox>
            <SuiBox mb={2}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableRow>
                    <TableCell>Akses</TableCell>
                    <TableCell>Read</TableCell>
                    <TableCell>Write</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id} >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={row?.abilities?.read}
                            onChange={() => handleChange(row, "read")}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={row?.abilities?.write}
                            onChange={() => handleChange(row, "write")}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={row?.abilities?.delete}
                            onChange={() => handleChange(row, "delete")}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SuiBox>
            <SuiBox display="flex" justifyContent="flex-end" mt={2}>
              <SuiButton mt={2} size="medium" color="info" onClick={() => handleSubmit()}>
                Save
              </SuiButton>
            </SuiBox>

          </SuiBox>
      }
    </CustomModal >
  );
};


export default ModalConfigure;
