/* eslint-disable */

/**
 * Create Parent Sub Menu
 */

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";

import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import Select from "components/Custom/Select";
import { LoadingState } from "components/Custom/Loading";

// @mui material components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

import MenuApi from "apis/Menu";
import CustomModal from "components/Custom/Modal";

const ModalConfigure = ({ modalConfig, setModalConfig }) => {
  const { id, name, } = modalConfig.data;
  const [fetchStatus, setFetchStatus] = useState({ loading: false });
  const [data, setData] = useState([]);
  const [submenu, setSubmenu] = useState([]);

  // create Submenu to server
  const formSubmitHandler = (values, { resetForm }) => {
    const finalValue = {
      name: values.name,
      type: values.type,
      content: { [`${values.type}_id`]: values.content }
    };

    MenuApi.createSubmenu(id, finalValue)
      .then((res) => resetForm())
      .finally(() => fetchParent());
  };

  const formik = useFormik({
    initialValues: { name: "", type: "", content: "", unique_id: "" },
    validationSchema: yup.object().shape({
      name: yup.string().required("Submenu Name is required!"),
      content: yup.string().required("Submenu is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, handleSubmit } = formik;

  // Fetch data Unlinked page & blog
  const getInitialData = () => {
    setFetchStatus({ loading: true });

    Axios.all([MenuApi.getPageUnlinked(), MenuApi.getBlogUnlinked()])
      .then((Axios.spread((resPage, resBlog) => {
        const mapPage = resPage.data.data.map(item => ({ ...item, value: `page${item.id}`, label: `${item.title} (Page)`, type: "page" }));
        const mapBlog = resBlog.data.data.map(item => ({ ...item, value: `blog${item.id}`, label: `${item.title} (Blog)`, type: "blog" }));

        setData([...mapPage, ...mapBlog]);
      })))
      .catch(() => window.alert("Error connect to server"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  // Get parent sub menu list
  const fetchParent = () => {
    setFetchStatus({ loading: true });
    MenuApi.getSingleParent(id)
      .then((res) => setSubmenu(res?.data?.data?.content ?? []))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    getInitialData();
    fetchParent();

    return () => setData([]);
  }, []);

  return (
    <CustomModal
      title={`${name} Configuration`}
      open={modalConfig.show && modalConfig.type === 'configure'}
      setModalConfig={setModalConfig}
    >
      {fetchStatus.loading
        ? <LoadingState />
        : <SuiBox>
          <SuiBox display="flex" justifyContent="flex-start" mt={2}>
            <SuiBox mb={2} mr={2}>
              <SuiInput
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={values.name}
                error={Boolean(errors.name && touched.name)}
                errorMessage={errors?.name ?? ""}
              />
            </SuiBox>
            <SuiBox mb={2} mr={2}>
              <Select
                placeholder="Select Sub Menu"
                option={data}
                defaultValue={data?.find(item => item.value === values.unique_id)}
                onChange={(option) => setValues({
                  ...values,
                  unique_id: option.value,
                  content: option.id,
                  type: option.type
                })}
                error={Boolean(errors.content && touched.content)}
                errorMessage={errors?.content ?? ""}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiButton
                size="medium"
                color="info" onClick={handleSubmit}>
                Add
              </SuiButton>
            </SuiBox>
          </SuiBox>

          <SuiBox mb={2}>
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
                  {/* <TableCell>
                    <SuiTypography variant="h6">Action</SuiTypography>
                  </TableCell> */}
                </TableRow>
                <TableBody>
                  {submenu?.length > 0 ? submenu.map((row) => (
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
        </SuiBox>
      }
    </CustomModal >
  );
};

export default ModalConfigure;
