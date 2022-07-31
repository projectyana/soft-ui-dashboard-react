/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";
import CustomModal from "components/Custom/Modal";

import RecentInfoCategoryApi from "apis/RecentInfoCategory";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, name, icon } = modalConfig.data;

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RecentInfoCategoryApi.update(id, values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      name: name ?? "",
      icon: icon ?? "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      icon: yup.string().required("Icon is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Edit Recent Info Category"
      open={modalConfig.show && modalConfig.type === 'edit'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="icon"
          placeholder="Icon"
          onChange={handleChange}
          value={values.icon}
          error={Boolean(errors.icon && touched.icon)}
          errorMessage={errors?.icon ?? ""}
        />
        <SuiTypography mt={2} variant="caption">Find your icon at https://fontawesome.com/search?s=solid</SuiTypography>
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