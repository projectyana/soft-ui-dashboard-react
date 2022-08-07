/* eslint-disable */

import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";

import SuiBox from 'components/SuiBox';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import CustomModal from 'components/Custom/Modal';
import { SelectIcon } from 'components/Custom/Select';

import GalleryApi from "apis/Gallery";

function ModalEditCategory({ fetchData, modalConfigCategory, setModalConfig }) {
  const { id, title, icon } = modalConfigCategory.data;

  const formSubmitHandler = (values, { setSubmiting }) => {
    GalleryApi.update(id, { title: values.title, icon: values.icon.value ?? values.icon })
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };
  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      icon: icon ? { value: icon, label: icon } : "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      icon: yup.object().required("Icon is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, handleSubmit } = formik;

  return (
    <CustomModal
      title="Edit Category"
      open={modalConfigCategory.show && modalConfigCategory.type === "edit"}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={values.title}
          error={Boolean(errors.code && touched.code)}
          errorMessage={errors?.code ?? ""}
        />
      </SuiBox>
      <SuiBox mb={2}>
        <SelectIcon
          name="icon"
          placeholder="Icon"
          value={values.icon}
          onChange={(opt) => setValues({ ...values, icon: opt })}
          error={Boolean(errors.icon && touched.icon)}
          errorMessage={!!(errors?.icon && touched.icon) ? errors?.icon : ""}
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
    </CustomModal>
  );
}

export default ModalEditCategory;