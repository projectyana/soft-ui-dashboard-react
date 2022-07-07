/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import RoleApi from "apis/Role";
import CustomModal from "components/Custom/Modal";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, code, name, description } = modalConfig.data;

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RoleApi.update(id, values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      code: code ?? "",
      name: name ?? "",
      description: description ?? ""
    },
    validationSchema: yup.object().shape({
      code: yup.string().required("Code is required!"),
      name: yup.string().required("Name is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Edit Role"
      open={modalConfig.show && modalConfig.type === 'edit'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="code"
          placeholder="Code"
          onChange={handleChange}
          value={values.code}
          error={Boolean(errors.code && touched.code)}
          errorMessage={errors?.code ?? ""}
        />
      </SuiBox>

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