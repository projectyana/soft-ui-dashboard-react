/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Grid,
  DialogActions
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import TextEditor from "components/Custom/TextEditor";
import CustomModal from "components/Custom/Modal";
import SuiTypography from "components/SuiTypography";
import { Select } from "components/Custom/Select";

import RecentInfoApi from "apis/RecentInfo";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig, dropdown }) => {
  // some delay function before submit
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    await sleep(1000);
    const finalValue = {
      ...values,
      description: values?.content,
    };

    RecentInfoApi.create(finalValue)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  const formik = useFormik({
    initialValues: {
      info: "",
      description: "",
      recent_info_category_id: "",
      publish_date: ""
    },
    validationSchema: yup.object().shape({
      info: yup.string().required("Info is required!"),
      recent_info_category_id: yup.string().required("Recent Info Category is required!"),
      publish_date: yup.string().required("Publish Date is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, handleSubmit } = formik;

  return (
    <CustomModal
      fullScreen
      maxWidth="false"
      title="Create New Recent Info"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="info"
          placeholder="Info"
          onChange={handleChange}
          value={values.info}
          error={Boolean(errors.info && touched.info)}
          errorMessage={errors?.info ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <Select
          placeholder="Select Recent Info Category"
          option={dropdown}
          values={values.recent_info_category_id}
          onChange={(option) => setValues({
            ...values,
            recent_info_category_id: option.value,
          })}
          error={Boolean(errors.recent_info_category_id && touched.recent_info_category_id)}
          errorMessage={!!(errors?.recent_info_category_id && touched?.recent_info_category_id) ? errors.recent_info_category_id : ""}
          menuPortalTarget={document.body}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          type="date"
          name="publish_date"
          placeholder="Publish Date"
          onChange={handleChange}
          value={values.publish_date}
          error={Boolean(errors.publish_date && touched.publish_date)}
          errorMessage={errors?.publish_date ?? ""}
        />
      </SuiBox>

      <Grid container spacing={{ xs: 1, md: 1 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <SuiTypography variant="h6">
            Description
          </SuiTypography>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <TextEditor formik={formik} />
        </Grid>
      </Grid>

      <DialogActions>
        <SuiBox display="flex" justifyContent="flex-end" mt={2}>
          <SuiButton
            variant="text"
            size="small"
            mt={2}
            sx={{ mr: 2 }}
            color="dark"
            onClick={() => setModalConfig({ show: false, data: null })}>
            Cancel
          </SuiButton>
          <SuiButton
            mt={2}
            size="medium"
            color="info"
            onClick={handleSubmit}>
            Save
          </SuiButton>
        </SuiBox>
      </DialogActions>
    </CustomModal>);
};

export default ModalCreate;