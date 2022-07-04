/* eslint-disable */

/**
 * Configure Role access
 */

import { useEffect, useState } from "react";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

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

const ModalConfigure = ({ modalConfig, setModalConfig }) => {
  const [data, setData] = useState([]);

  const fakeAkses = [
    {
      id: '1',
      code: "menu_role",
      name: "Menu Role",
      abilities: {
        read: true,
        write: true,
        delete: true
      }
    },
    {
      id: '2',
      code: "menu_role",
      name: "Menu Role",
      abilities: {
        read: true,
        write: true,
        delete: true
      }
    },
  ];

  // Fetch data from server
  const fetchData = () => {

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

  };

  useEffect(() => {
    setData(fakeAkses);

    return () => { };
  }, []);

  useEffect(() => {
    console.log(data);

  }, [data]);



  return (
    <CustomModal
      title="Edit Role"
      open={modalConfig.show && modalConfig.type === 'configure'}
      setModalConfig={setModalConfig}
    >
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
      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
        <SuiButton mt={2} size="medium" color="info" onClick={() => setModalConfig({ show: true })}>
          Save
        </SuiButton>
      </SuiBox>
    </CustomModal>
  );
};


export default ModalConfigure;
