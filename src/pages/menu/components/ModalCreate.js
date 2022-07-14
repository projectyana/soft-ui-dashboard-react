import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import MenuApi from "apis/Menu";
import CustomModal from "components/Custom/Modal";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    MenuApi.create(values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: yup.object().shape({
      name: yup.string().required("Menu Name is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Create New Parent Menu"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
      maxWidth="sm"
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