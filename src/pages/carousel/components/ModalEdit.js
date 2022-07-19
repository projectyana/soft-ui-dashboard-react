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

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, link, title, slug, body, url, image } = modalConfig?.data ?? {};
  const [dataGambar, setDataGambar] = useState([{ link }]);

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", dataGambar[0]?.data);

    return CarouselApi.upload(formData)
      .then((res) => res?.data?.data)
      .catch((err) => { });
  };

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    const finalValue = { ...values };

    if (dataGambar[0]?.data) {
      const imageLink = await handleUploadImage();
      finalValue.image = dataGambar[0]?.nama;
      finalValue.url = imageLink;
    }

    CarouselApi.update(id, finalValue)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      slug: slug ?? "",
      body: body ?? "",
      url: url ?? "",
      image: image ?? ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      slug: yup.string().required("Slug is required!"),
      body: yup.string().required("Body is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Edit Carousel"
      open={modalConfig.show && modalConfig.type === 'edit'}
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
          name="slug"
          placeholder="Slug"
          onChange={handleChange}
          value={values.slug}
          error={Boolean(errors.slug && touched.slug)}
          errorMessage={errors?.slug ?? ""}
        />
      </SuiBox>

      {/* <SuiBox mb={2}>
        <SuiInput
          name="url"
          placeholder="https://www.example.com"
          onChange={handleChange}
          value={values.url}
          error={Boolean(errors.url && touched.url)}
          errorMessage={errors?.url ?? ""}
        />
      </SuiBox> */}

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

export default ModalEdit;