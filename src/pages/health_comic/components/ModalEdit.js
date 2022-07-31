/* eslint-disable */
import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { LoadingState } from "components/Custom/Loading";

import HealthComicApi from "apis/HealthComic";
import CustomModal from "components/Custom/Modal";
import InputImage from "./InputImage";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const [loading, setLoading] = useState(false);
  const { id, link, title, icon, category, image } = modalConfig?.data ?? {};
  const [dataGambar, setDataGambar] = useState([{ link }]);

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", dataGambar[0]?.data);

    return HealthComicApi.upload(formData)
      .then((res) => res?.data?.data)
      .catch((err) => { });
  };

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    if (dataGambar.length > 0) {
      const finalValue = { ...values };

      if (dataGambar[0]?.data) {
        const imageLink = await handleUploadImage();
        finalValue.image = dataGambar[0]?.nama;
        finalValue.url = imageLink;
      }

      HealthComicApi.update(id, finalValue)
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch((err) => window.alert("Error connect to server"));

    }
    else {
      window.alert("Image carousel is required!");
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      icon: icon ?? "",
      category: category ?? ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      icon: yup.string().required("Icon is required!"),
      category: yup.string().required("Category is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  const fetchImage = () => {
    setLoading(true);
    HealthComicApi.getSingle(id)
      .then((res) => {
        console.log(res);
        const mapAssetPath = res?.data?.data?.assets_path?.map((item) => ({ link: `https://api.rokom.xyz/${item}` }));
        setDataGambar(mapAssetPath ?? []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImage();

    return () => { setDataGambar([]); };
  }, [id]);

  return (
    <CustomModal
      title="Edit Health Comic"
      open={modalConfig.show && modalConfig.type === 'edit'}
      setModalConfig={setModalConfig}
    >
      {loading ? <LoadingState /> : <InputImage dataGambar={dataGambar} setDataGambar={setDataGambar} />}

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
          name="icon"
          placeholder="example icon: fas fa-cube"
          onChange={handleChange}
          value={values.icon}
          error={Boolean(errors.icon && touched.icon)}
          errorMessage={errors?.icon ?? ""}
        />
        <SuiTypography mt={2} variant="caption">Find your icon at https://fontawesome.com/search?s=solid</SuiTypography>
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

export default ModalEdit;