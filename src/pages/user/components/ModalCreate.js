import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import UserApi from "apis/User";

import CustomModal from "components/Custom/Modal";
import Select from "components/Custom/Select";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig, roles }) => {

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    UserApi.create(values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      role_id: ""

    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username is required!"),
      name: yup.string().required("Name is required!"),
      email: yup.string().email("Email format isn't valid").required("Email is required!"),
      password: yup.string().required("Password is required!"),
      role_id: yup.string().required("User Role is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setFieldValue, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Create New User"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={values.username}
          error={Boolean(errors.username && touched.username)}
          errorMessage={errors?.username ?? ""}
        />
      </SuiBox>

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
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
          error={Boolean(errors.email && touched.email)}
          errorMessage={errors?.email ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <Select
          placeholder="Select Role"
          option={roles}
          onChange={(option) => setFieldValue('role_id', option.value)}
          error={Boolean(errors.role_id && touched.role_id)}
          errorMessage={errors?.role_id ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          error={Boolean(errors.password && touched.password)}
          errorMessage={errors?.password ?? ""}
        />
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