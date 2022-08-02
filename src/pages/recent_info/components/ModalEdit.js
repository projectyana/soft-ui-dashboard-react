/* eslint-disable */
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import { Select } from "components/Custom/Select";

import RecentInfoApi from "apis/RecentInfo";
import CustomModal from "components/Custom/Modal";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig, dropdown }) => {
  const { id, info, description, publish_date, recent_info_category_id } = modalConfig.data;

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    RecentInfoApi.update(id, values)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      info: info ?? "",
      description: description ?? "",
      recent_info_category_id: recent_info_category_id ?? "",
      publish_date: publish_date ?? ""
    },
    validationSchema: yup.object().shape({
      info: yup.string().required("Info is required!"),
      description: yup.string().required("Description is required!"),
      recent_info_category_id: yup.string().required("Recent Info Category is required!"),
      publish_date: yup.string().required("Publish Date is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, isSubmitting, handleSubmit } = formik;

  return (
    <CustomModal
      title="Edit Recent Info"
      open={modalConfig.show && modalConfig.type === 'edit'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="info"
          placeholder="Info"
          onChange={handleChange}
          value={values.info}
          defaultValue={values.info}
          error={Boolean(errors.info && touched.info)}
          errorMessage={errors?.info ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={values.description}
          error={Boolean(errors.description && touched.description)}
          errorMessage={errors?.description ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <Select
          placeholder="Select Recent Info Category"
          option={dropdown}
          values={values.recent_info_category_id}
          defaultValue={values.recent_info_category_id ? dropdown.find(item => item.value === values.recent_info_category_id) : null}
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
          defaultValue={values.publish_date}
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

export default ModalEdit;