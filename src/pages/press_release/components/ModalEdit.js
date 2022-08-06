/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import PressReleaseApi from "apis/PressRelease";
import CustomModal from "components/Custom/Modal";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, title, category, description } = modalConfig.data;

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    PressReleaseApi.update(id, values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      category: category ?? "",
      description: description ?? ""
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required!"),
      category: yup.string().required("Category is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Edit Press Release"
      open={modalConfig.show && modalConfig.type === 'edit'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
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
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={values.category}
          error={Boolean(errors.category && touched.category)}
          errorMessage={errors?.category ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          multiline
          rows={5}
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={values.description}
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