/* eslint-disable */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import { Select } from "components/Custom/Select";

import RecentInfoCategoryApi from "apis/RecentInfoCategory";
import CustomModal from "components/Custom/Modal";
import SuiTypography from "components/SuiTypography";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RecentInfoCategoryApi.create(values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      icon: yup.string().required("Icon is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      maxWidth="md"
      title="Create New Recent Info Category"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="icon"
          placeholder="example icon: fas fa-cube"
          onChange={handleChange}
          value={values.icon}
          error={Boolean(errors.icon && touched.icon)}
          errorMessage={errors?.icon ?? ""}
        />
        <SuiTypography mt={2} variant="caption">Find your icon at https://fontawesome.com/search?s=solid</SuiTypography>
      </SuiBox>

      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
        <SuiButton
          mt={2}
          size="medium"
          color="info"
          onClick={handleSubmit}>
          Save
        </SuiButton>
      </SuiBox>
    </CustomModal>);

};

export default ModalCreate;