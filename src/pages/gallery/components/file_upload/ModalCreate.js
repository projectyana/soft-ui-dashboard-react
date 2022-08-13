/* eslint-disable */
import { useEffect, useState, useCallback } from 'react';
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
  const [dropdown, setDropdown] = useState({ loading: true, category: [] });
  const [dataFile, setDataFile] = useState({});

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    if (dataFile) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("file", dataFile?.data);

      FileUploadApi.create(values.id_category, formData)
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
      id_category: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name File is required!"),
      id_category: yup.string().required("File Category is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, setValues, handleChange, isSubmitting, handleSubmit } = formik;

  const fetchParentDropdown = () => {
    setDropdown(prev => ({ ...prev, loading: true }));

    FileUploadApi.dropdownCategory()
      .then(({ data }) => {
        const categories = [];

        data?.data?.forEach(category => {
          categories.push(category);
          if (category.sub_categories) categories.push(category.sub_categories);
        });

        const flattenCategories = categories.flat();
        const mapDropdown = flattenCategories?.map(({ id, name }) => ({ value: id, label: name }));
        setDropdown({ category: mapDropdown ?? [], loading: false });
      });
  };

  useEffect(() => {
    fetchParentDropdown();

    return () => setDropdown({ category: [] });;
  }, []);

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
          placeholder="Choose File Category"
          name="id_category"
          loading={dropdown.loading}
          options={dropdown.category ?? []}
          onChange={(opt) => setValues({ ...values, id_category: opt.value })}
          error={Boolean(errors.id_category && touched.id_category)}
          errorMessage={!!(errors?.id_category && touched.id_category) ? errors.id_category : ""}
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