/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import LivestreamApi from "apis/Livestream";
import CustomModal from "components/Custom/Modal";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    LivestreamApi.start(values)
      .then(({ data }) => setModalConfig(prev => ({ ...prev, show: false })))
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"))
      .finally(() => setTimeout(() => fetchData(), 1000));
  };

  const formik = useFormik({
    initialValues: { name: "", url: "" },
    validationSchema: yup.object().shape({
      name: yup.string().required("Livestream Name is required!"),
      url: yup.string().required("Livestream URL is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Create New Livestream"
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
        <SuiInput
          name="url"
          placeholder="Livestream URL"
          onChange={handleChange}
          value={values.url}
          error={Boolean(errors.url && touched.url)}
          errorMessage={errors?.url ?? ""}
        />
      </SuiBox>

      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
        <SuiButton
          mt={2}
          size="medium"
          color="info"
          onClick={handleSubmit}>
          Start
        </SuiButton>
      </SuiBox>
    </CustomModal>);
};

export default ModalCreate;