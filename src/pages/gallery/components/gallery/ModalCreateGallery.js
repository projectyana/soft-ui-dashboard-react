/* eslint-disable */

import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';
import CustomModal from 'components/Custom/Modal';
import { Select } from "components/Custom/Select";

import GalleryApi from "apis/Gallery";
import InputImage from "./InputImage";

function ModalCreateGallery({ fetchData, modalConfig, setModalConfig, categories }) {
  const [dataGambar, setDataGambar] = useState([]);

  const formSubmitHandler = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('image', dataGambar[0].data);

    GalleryApi.addFile(values.gallery_id, formData)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert(err));
  };

  const formik = useFormik({
    initialValues: {
      gallery_id: "",
      name: ""
    },
    validationSchema: yup.object().shape({
      gallery_id: yup.string().required("Category is required"),
      name: yup.string().required("Name is required")
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setFieldValue, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Upload New Image Gallery"
      open={modalConfig.show && modalConfig.type === 'gallery'}
      setModalConfig={setModalConfig}
    >
      <InputImage dataGambar={dataGambar} setDataGambar={setDataGambar} />
      <SuiBox mt={3}>
        <SuiInput
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>
      <SuiBox mb={2} pt={2}>
        <Select
          placeholder="Select Gallery Category"
          option={categories}
          onChange={(option) => setFieldValue('gallery_id', option.value)}
          error={Boolean(errors.gallery_id && touched.gallery_id)}
          errorMessage={!!(errors?.gallery_id && touched.gallery_id) ? errors.gallery_id : ""}
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

export default ModalCreateGallery;