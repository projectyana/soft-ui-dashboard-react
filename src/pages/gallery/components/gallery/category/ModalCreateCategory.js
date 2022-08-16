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

function ModalCreateCategory({ fetchData, modalConfigCategory, setModalConfig }) {
  const formSubmitHandler = (values, { setSubmitting }) => {
    GalleryApi.create({
      ...values,
      icon: values.icon.value
    })
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      icon: yup.object().required("Icon is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Create new category"
      open={modalConfigCategory.show && modalConfigCategory.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="title"
          placeholder="Category Title"
          onChange={handleChange}
          value={values.title}
          error={Boolean(errors.title && touched.title)}
          errorMessage={errors?.title ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SelectIcon
          name="icon"
          placeholder="Icon"
          value={values.icon}
          onChange={(opt) => setValues({ ...values, icon: opt })}
          menuPosition="fixed"
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

export default ModalCreateCategory;