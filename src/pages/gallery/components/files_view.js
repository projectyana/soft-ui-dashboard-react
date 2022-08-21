/* eslint-disable */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon,
  Tooltip,
} from "@mui/material";
import FileSaver from "file-saver";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import { LoadingState } from "components/Custom/Loading";

import FileUploadApi from "apis/FileUpload";
import getRolePermissions from "utils/getRolePermissions";

// Category Component
import ModalCreateCategory from "./file_upload/category/ModalCreateCategory";
import ModalEditCategory from "./file_upload/category/ModalEditCategory";

// File Component
import ModalCreate from "./file_upload/ModalCreate";
import ModalEdit from "./file_upload/ModalEdit";
import ModalDelete from "./file_upload/ModalDelete";

const FilesView = ({ modalCreate, setModalCreate }) => {
  const { isAllowWrite, isAllowDelete } = getRolePermissions();
  const [loading, setLoading] = useState({ fetch: true });
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState({
    parent: [],
    subcategories: [],
    categories: [],
  });
  const [selectedCat, setSelectedCat] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    type: "edit",
    data: null,
  });
  const [modalDelete, setModalDelete] = useState({
    show: false,
    data: null,
  });
  const [modalConfigCategory, setModalConfigCategory] = useState({ show: false });
  const [filter, setFilter] = useState({
    parent_id: "",
    doc_category_id: ""
  });

  const fetchData = (fetch = true) => {
    setLoading({ fetch });

    Axios.all([
      FileUploadApi.get(),
      FileUploadApi.getCategories()
    ])
      .then(
        Axios.spread((res, resCat) => {
          const mapParentCategory = resCat?.data?.data?.map((item) => ({ ...item, value: item.id, label: item.name }));

          const mapSubCategory = resCat?.data?.data?.map(({ sub_categories }) => sub_categories ?? [])
            ?.flat()
            ?.map((item) => ({ ...item, value: item.id, label: item.name })) ?? [];

          const allCategories = mapParentCategory.concat(mapSubCategory);

          // Map category and subcategory list document
          const files = res.data.data.map((item) => {
            const subcategory = allCategories.find(({ value }) => value === item.doc_category_id) ?? {};
            const category = allCategories.find(({ value }) => value === subcategory.parent_id) ?? {};

            return {
              ...item,
              full_path: `https://api.rokom.xyz/${item.path}`,
              category: { id: category.id, name: category.name },
              subcategory: { parent_id: subcategory.parent_id, id: subcategory.id, name: subcategory.name },
            };
          });

          setDropdown({
            parent: mapParentCategory,
            subcategories: mapSubCategory,
            categories: allCategories
          });
          setData(files ?? []);
        })
      )
      .finally(() => setLoading({ fetch: false }));
  };

  const handleDownload = (url) => {
    const fileName = url.split("/").pop();
    FileSaver.saveAs(url, fileName);
  };

  const filterSubCategories = filter.parent_id ? dropdown?.subcategories?.filter((val) => val.parent_id === filter?.parent_id) : dropdown?.subcategories;

  // if filter parent_id is not empty, then check filter subcategories 
  const filterData = filter.parent_id ? data?.filter((val) => {
    if (filter.doc_category_id) {
      return val.subcategory.id === filter.doc_category_id;
    }
    return val.category.id === filter.parent_id;
  }) : data;

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
    };
  }, []);

  if (loading.fetch) {
    return <LoadingState />;
  }

  return (
    <>
      <SuiBox mb={1} display="flex" justifyContent="start" alignItems="center">
        <SuiTypography variant="h2">Categories</SuiTypography>
        {isAllowWrite && (
          <Tooltip title="Create new File Category">
            <SuiButton
              rounded="small"
              sx={{ marginTop: 0.5, marginLeft: 1 }}
              iconOnly
              size="small"
              color="info"
              onClick={() => setModalConfigCategory({ show: true, type: "create" })}
            >
              <Icon>add</Icon>
            </SuiButton>
          </Tooltip>
        )}
      </SuiBox>

      <SuiBox pb={2} display="flex" flexWrap="wrap" justifyContent="start" alignItems="center">
        {/* Show All Subcategories */}
        <Chip
          sx={{ margin: 0.5, textTransform: "capitalize" }}
          label="All"
          variant="outlined"
          color={filter?.parent_id === "" ? "info" : "secondary"}
          onClick={() => setFilter(prev => ({ parent_id: "", doc_category_id: "" }))}
        />

        {dropdown?.parent?.length > 0 &&
          dropdown?.parent?.map((row) => (
            <Chip
              sx={{ margin: 0.5, textTransform: "capitalize" }}
              label={row.label}
              variant="outlined"
              onDelete={isAllowWrite ? () => setModalConfigCategory({ show: true, type: 'edit', data: row }) : null}
              deleteIcon={isAllowWrite ? <Icon>edit</Icon> : null}
              color={filter?.parent_id === row.value ? "info" : "secondary"}
              onClick={() => setFilter(prev => ({ parent_id: row.value, doc_category_id: "" }))}
            />
          ))}
      </SuiBox>

      <SuiTypography variant="h5">Subcategories</SuiTypography>
      <SuiBox pb={2} display="flex" flexWrap="wrap" justifyContent="start" alignItems="center">
        {filterSubCategories?.length > 0 &&
          filterSubCategories?.map((row) => (
            <Chip
              sx={{ margin: 0.5 }}
              label={row.label}
              variant="outlined"
              onDelete={isAllowWrite ? () => setModalConfigCategory({ show: true, type: 'edit', data: row }) : null}
              deleteIcon={isAllowWrite ? <Icon>edit</Icon> : null}
              color={filter?.doc_category_id === row.id ? "info" : "secondary"}
              onClick={() => setFilter(prev => ({ parent_id: row.parent_id, doc_category_id: row.id }))}
            />
          ))}
      </SuiBox>
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
              <SuiTypography variant="h6">Subcategory</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {filterData?.length > 0 ? (
              filterData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <SuiTypography variant="caption">{row.name}</SuiTypography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <SuiTypography variant="caption">{row?.category?.name ?? ""}</SuiTypography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <SuiTypography variant="caption">{row?.subcategory?.name ?? ""}</SuiTypography>
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
                      <EditButton onClick={() => setModalConfig({ show: true, type: "edit", data: row })} />
                      <DeleteButton onClick={() => setModalDelete({ show: true, type: "delete", data: row })} />
                    </SuiBox>
                  </TableCell>
                </TableRow>
              ))
            ) : (
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
      {
        modalCreate.show && modalCreate.type === "file" && (
          <ModalCreate
            fetchData={fetchData}
            modalConfig={modalCreate}
            setModalConfig={setModalCreate}
          />
        )
      }

      {/* Modal  Edit*/}
      {
        modalConfig.show && modalConfig.type === "edit" && (
          <ModalEdit
            fetchData={fetchData}
            modalConfig={modalConfig}
            setModalConfig={setModalConfig}
          />
        )
      }

      {/* Modal Delete */}
      {
        modalDelete.show && (
          <ModalDelete
            fetchData={fetchData}
            modalConfig={modalDelete}
            setModalConfig={setModalDelete}
          />
        )
      }

      {/* Modal Create Category */}
      {
        modalConfigCategory.show && modalConfigCategory.type === "create" && (
          <ModalCreateCategory
            fetchData={fetchData}
            modalConfigCategory={modalConfigCategory}
            setModalConfig={setModalConfigCategory}
          />
        )
      }

      {/* Modal Edit Category */}
      {
        modalConfigCategory.show && modalConfigCategory.type === "edit" && (
          <ModalEditCategory
            fetchData={fetchData}
            modalConfigCategory={modalConfigCategory}
            setModalConfig={setModalConfigCategory}
          />
        )
      }
    </>
  );
};

export default FilesView;
