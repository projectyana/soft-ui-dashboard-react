import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon,
  Tooltip,
  ButtonGroup
} from "@mui/material";
import FileSaver from "file-saver";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { LoadingState } from "components/Custom/Loading";

import FileUploadApi from "apis/FileUpload";

// Category Component
import ModalCreateCategory from "./file_upload/category/ModalCreateCategory";
import ModalEditCategory from "./file_upload/category/ModalEditCategory";

// File Component
import ModalCreate from "./file_upload/ModalCreate";
import ModalDelete from "./file_upload/ModalDelete";

const FilesView = ({ modalCreate, setModalCreate }) => {
  const [loading, setLoading] = useState({ fetch: true });
  const [data, setData] = useState([]);
  const [modalDelete, setModalDelete] = useState({
    show: false,
    data: null
  });
  const [modalConfigCategory, setModalConfigCategory] = useState({ show: false });

  const fetchData = () => {
    setLoading({ fetch: true });
    FileUploadApi.get()
      .then(res => {
        const files = res.data.data.map(item => ({ ...item, full_path: `https://api.rokom.xyz/${item.path}` }));
        setData(files ?? []);
      })
      .finally(() => setLoading({ fetch: false }));
  };

  const handleDownload = (url) => {
    const fileName = url.split("/").pop();
    FileSaver.saveAs(url, fileName);
  };

  useEffect(() => {
    fetchData();
    return () => { setData([]); };

  }, []);

  if (loading.fetch) {
    return <LoadingState />;
  }
  return (
    <>
      <SuiBox mb={1} display="flex" justifyContent="start" alignItems="center" >
        <SuiTypography variant="h2">Categories</SuiTypography>
        <ButtonGroup>
          <Tooltip title="Create new File Category">
            <SuiButton
              rounded="small"
              sx={{ marginTop: 0.5, marginLeft: 1 }}
              iconOnly
              size="small"
              color="info"
              onClick={() => setModalConfigCategory({ show: true, type: 'create' })} >
              <Icon>add</Icon>
            </SuiButton>
          </Tooltip>

          <Tooltip title="Edit File Category">
            <SuiButton
              rounded="small"
              sx={{ marginTop: 0.5, marginLeft: 1 }}
              iconOnly
              size="small"
              color="success"
              onClick={() => setModalConfigCategory({ show: true, type: 'edit' })} >
              <Icon>edit</Icon>
            </SuiButton>
          </Tooltip>

        </ButtonGroup>
      </SuiBox >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Name</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Category</SuiTypography>
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
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row?.category?.name ?? ""}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="dark"
                        onClick={() => handleDownload(row.full_path)}
                      >
                        <Icon>download</Icon>&nbsp;download
                      </SuiButton>
                    </SuiBox>
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="error"
                        onClick={() => setModalDelete({ show: true, type: "delete", data: row })}
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
                  <SuiTypography variant="h6">No files found</SuiTypography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal  Create */}
      {modalCreate.show && modalCreate.type === "file" && <ModalCreate fetchData={fetchData} modalConfig={modalCreate} setModalConfig={setModalCreate} />}

      {/* Modal Delete */}
      {modalDelete.show && <ModalDelete fetchData={fetchData} modalConfig={modalDelete} setModalConfig={setModalDelete} />}

      {/* Modal Create Category */}
      {modalConfigCategory.show && modalConfigCategory.type === "create" &&
        <ModalCreateCategory
          modalConfigCategory={modalConfigCategory}
          setModalConfig={setModalConfigCategory}
        />}

      {/* Modal Edit Category */}
      {modalConfigCategory.show && modalConfigCategory.type === "edit" &&
        <ModalEditCategory
          modalConfigCategory={modalConfigCategory}
          setModalConfig={setModalConfigCategory}
        />}
    </>
  );
};

export default FilesView;
