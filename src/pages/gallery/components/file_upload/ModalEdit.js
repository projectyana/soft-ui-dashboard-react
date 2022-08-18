/* eslint-disable */
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";
import CustomModal from "components/Custom/Modal";
import { Select } from "components/Custom/Select";

import FileUploadApi from "apis/FileUpload";

import InputFile from "./InputFile";

const ModalEdit = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id, doc_category_id, name, path } = modalConfig.data;
  const [dropdown, setDropdown] = useState({ loading: true, category: [] });
  const [dataFile, setDataFile] = useState({});

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("category_id", values.id_category);

    // if file is changed
    if (dataFile?.data) formData.append("file", dataFile?.data);

    FileUploadApi.update(id, formData)
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
        fetchData();
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  const formik = useFormik({
    initialValues: {
      name: name ?? "",
      id_category: doc_category_id ?? "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name File is required!"),
      id_category: yup.string().required("File Category is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, setValues, handleChange, isSubmitting, handleSubmit } = formik;

  const fetchParentDropdown = () => {
    setDropdown(prev => ({ ...prev, loading: true }));

    FileUploadApi.getCategories()
      .then(({ data }) => {
        const mapDropdown = data?.data?.map(({ sub_categories }) => sub_categories ?? [])?.flat()?.map(item => ({ ...item, value: item.id, label: item.name })) ?? [];
        setDropdown({ category: mapDropdown ?? [], loading: false });
      });
  };

  useEffect(() => {
    fetchParentDropdown();

    // set file name to input file
    if (path) { setDataFile({ nama: path.split("/")[2] }); }

    return () => setDropdown({ category: [] });;
  }, []);

  return (
    <CustomModal
      maxWidth="lg"
      title="Edit File"
      open={modalConfig.show && modalConfig.type === 'edit'}
      setModalConfig={setModalConfig}
    >
      <InputFile dataFile={dataFile} setDataFile={setDataFile} />

      <SuiBox mt={3} mb={2}>
        <SuiInput
          name="name"
          placeholder="Name File"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <Select
          placeholder="Choose File Category"
          name="id_category"
          loading={dropdown.loading}
          options={dropdown.category ?? []}
          defaultValue={values.id_category ? dropdown?.category?.find(item => item.value === values.id_category) : null}
          onChange={(opt) => setValues({ ...values, id_category: opt.value })}
          menuPosition="fixed"
          error={Boolean(errors.id_category && touched.id_category)}
          errorMessage={!!(errors?.id_category && touched.id_category) ? errors.id_category : ""}
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