/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import { Select } from "components/Custom/Select";

import RecentInfoApi from "apis/RecentInfo";
import CustomModal from "components/Custom/Modal";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig, dropdown }) => {
  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RecentInfoApi.create(values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      info: "",
      recent_info_category_id: "",
      publish_date: ""
    },
    validationSchema: yup.object().shape({
      info: yup.string().required("Info is required!"),
      recent_info_category_id: yup.string().required("Recent Info Category is required!"),
      publish_date: yup.string().required("Publish Date is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      maxWidth="md"
      title="Create New Info"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="info"
          placeholder="Info"
          onChange={handleChange}
          value={values.info}
          error={Boolean(errors.info && touched.info)}
          errorMessage={errors?.info ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <Select
          placeholder="Select Recent Info Category"
          option={dropdown}
          values={values.recent_info_category_id}
          onChange={(option) => setValues({
            ...values,
            recent_info_category_id: option.value,
          })}
          error={Boolean(errors.recent_info_category_id && touched.recent_info_category_id)}
          errorMessage={errors?.recent_info_category_id ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          type="date"
          name="publish_date"
          placeholder="Publish Date"
          onChange={handleChange}
          value={values.publish_date}
          error={Boolean(errors.publish_date && touched.publish_date)}
          errorMessage={errors?.publish_date ?? ""}
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