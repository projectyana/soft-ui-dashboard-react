/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import { SelectIcon } from "components/Custom/Select";

import RecentInfoCategoryApi from "apis/RecentInfoCategory";
import CustomModal from "components/Custom/Modal";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RecentInfoCategoryApi.create({
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
      name: "",
      icon: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      icon: yup.object().required("Icon is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, setValues, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      maxWidth="md"
      title="Create New Recent Info Category"
      open={modalConfig.show && modalConfig.type === 'create'}
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
        <SelectIcon
          name="icon"
          placeholder="Select icon"
          value={values.icon}
          onChange={(opt) => setValues({ ...values, icon: opt })}
          error={Boolean(errors.icon && touched.icon)}
          errorMessage={errors?.icon ?? ""}
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