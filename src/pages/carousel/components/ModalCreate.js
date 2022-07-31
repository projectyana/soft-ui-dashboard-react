/* eslint-disable */
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import CarouselApi from "apis/Carousel";
import CustomModal from "components/Custom/Modal";
import InputImage from "./InputImage";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  const [dataGambar, setDataGambar] = useState([]);

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", dataGambar[0]?.data);

    return CarouselApi.upload(formData)
      .then((res) => res?.data?.data)
      .catch((err) => { });
  };

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    const imageLink = await handleUploadImage();
    const finalValue = {
      ...values,
      image: dataGambar[0]?.nama,
      url: imageLink,
    };

    console.log(finalValue)

    CarouselApi.create(finalValue)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      body: yup.string().required("Body is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Create New Carousel"
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
        <SuiInput
          multiline
          rows={5}
          name="body"
          placeholder="Body"
          onChange={handleChange}
          value={values.body}
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