/* eslint-disable */
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { SelectIcon } from "components/Custom/Select";

import HealthComicApi from "apis/HealthComic";
import CustomModal from "components/Custom/Modal";
import InputImage from "./InputImage";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  const [dataGambar, setDataGambar] = useState([]);

  const handleUploadImage = async (item) => {
    const formData = new FormData();
    formData.append("image", item?.data);

    return HealthComicApi
      .upload(formData)
      .then((res) => res?.data?.data);
  };

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    if (dataGambar.length > 0) {

      const assets_path = await Promise.all(dataGambar?.map(async (item) => {
        return await handleUploadImage(item);
      }));

      const finalValue = {
        ...values,
        icon: values.icon.value,
        thumbnail: assets_path[0],
        assets_path
      };

      HealthComicApi.create(finalValue)
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch((err) => window.alert("Error connect to server"));
    }
    else {
      window.alert("Comic Image is required!");
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: "",
      category: ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      icon: yup.object().required("Icon is required!"),
      category: yup.string().required("Category is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, setValues, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      maxWidth="lg"
      title="Create New Health Comic"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <InputImage dataGambar={dataGambar} setDataGambar={setDataGambar} />
      <SuiBox mt={3} mb={2}>
        <SuiInput
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={values.title}
          error={Boolean(errors.title && touched.title)}
          errorMessage={errors?.title ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SelectIcon
          name="icon"
          placeholder="Select icon"
          value={values.icon}
          onChange={(opt) => setValues({ ...values, icon: opt })}
          error={Boolean(errors.icon && touched.icon)}
          errorMessage={errors?.icon ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={values.category}
          error={Boolean(errors.category && touched.category)}
          errorMessage={errors?.category ?? ""}
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