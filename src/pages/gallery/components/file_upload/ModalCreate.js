/* eslint-disable */
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import CustomModal from "components/Custom/Modal";
import { Select } from "components/Custom/Select";

import FileUploadApi from "apis/FileUpload";

import InputFile from "./InputFile";
const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  const [dataFile, setDataFile] = useState({});
  const dropdownType = [
    { value: "umum", label: "Umum" },
    { value: "pembangunan", label: "Pembangunan" }
  ];

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    if (dataFile) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("date", values.date);
      formData.append("type", values.type);
      formData.append("file", dataFile?.data);

      FileUploadApi.create(formData)
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch(() => window.alert("Error connect to server"));
    }
    else {
      window.alert("Comic Image is required!");
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      date: ""
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name File is required!"),
      type: yup.string().required("Type is required!"),
      date: yup.string().required("Date is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, setValues, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      maxWidth="lg"
      title="Upload New File"
      open={modalConfig.show && modalConfig.type === 'file'}
      setModalConfig={setModalConfig}
    >
      <InputFile dataFile={dataFile} setDataFile={setDataFile} />
      <SuiBox mt={3} mb={2}>
        <SuiInput
          name="name"
          placeholder="Name File"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <Select
          placeholder="Choose Type"
          name="type"
          options={dropdownType}
          onChange={(opt) => setValues({ ...values, type: opt.value })}
          error={Boolean(errors.type && touched.type)}
          errorMessage={!!(errors?.type && touched.type) ? errors.type : ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="date"
          type="date"
          onChange={(e) => setValues({ ...values, date: e.target.value })}
          error={Boolean(errors.date && touched.date)}
          errorMessage={errors?.date ?? ""}
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