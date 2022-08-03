/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import CustomModal from "components/Custom/Modal";
import { SelectIcon } from "components/Custom/Select";

import RecentInfoCategoryApi from "apis/RecentInfoCategory";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, name, icon } = modalConfig.data;

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RecentInfoCategoryApi.update(id, { name: values.name, icon: values.icon.value ?? values.icon })
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  // Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name ?? "",
      icon: icon ? { value: icon, label: icon } : "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      icon: yup.object().required("Icon is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, isSubmitting, handleSubmit } = formik;

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

export default ModalEdit;