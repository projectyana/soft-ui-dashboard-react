/* eslint-disable */
import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import { LoadingState } from "components/Custom/Loading";
import { SelectIcon } from "components/Custom/Select";

import HealthComicApi from "apis/HealthComic";
import CustomModal from "components/Custom/Modal";
import InputImage from "./InputImage";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const [loading, setLoading] = useState(false);
  const { id, link, title, icon, category, thumbnail } = modalConfig?.data ?? {};
  const [dataGambar, setDataGambar] = useState([{ link }]);

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
      const prev_assets = dataGambar?.filter(i => Boolean(i.relative_path))?.map(i => i.relative_path);
      const filter_new_assets_path = await Promise.all(dataGambar?.filter(i => Boolean(i.data))?.map(async (item) => {
        return await handleUploadImage(item);
      }));

      const finalValue = {
        ...values,
        thumbnail,
        icon: values.icon.value,
        assets_path: prev_assets.concat(filter_new_assets_path)
      };

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
      icon: icon ? { value: icon, label: icon } : "",
      category: category ?? ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      icon: yup.object().required("Icon is required!"),
      category: yup.string().required("Category is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, setValues, handleChange, isSubmitting, handleSubmit } = formik;

  const fetchImage = () => {
    setLoading(true);
    HealthComicApi.getSingle(id)
      .then((res) => {
        console.log(res);
        const mapAssetPath = res?.data?.data?.assets_path?.map((item) => ({ relative_path: item, link: `https://api.rokom.xyz/${item}` }));
        console.log(mapAssetPath);
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

export default ModalEdit;