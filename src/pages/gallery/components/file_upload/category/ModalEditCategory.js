/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";

import SuiBox from 'components/SuiBox';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import CustomModal from 'components/Custom/Modal';
import { Select } from 'components/Custom/Select';

import FileUploadApi from "apis/FileUpload";

import ModalDeleteCategory from "./ModalDeleteCategory";

function ModalEditCategory({ fetchData, modalConfigCategory, setModalConfig }) {
  const [dropdown, setDropdown] = useState({ loading: true, category: [] });
  const [modalDelete, setModalDelete] = useState({ show: false });

  const formSubmitHandler = (values, { setSubmiting }) => {
    FileUploadApi.updateCategory(values.id, { name: values.name })
      .then(({ data }) => {
        setModalConfig(prev => ({ ...prev, show: false }));
      })
      .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: ""
    },
    validationSchema: yup.object().shape({
      id: yup.string().required("Select category to edit!"),
      name: yup.string().required("New Categoy name is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, handleSubmit } = formik;

  const fetchParentDropdown = () => {
    setDropdown(prev => ({ ...prev, loading: true }));

    FileUploadApi.dropdownCategory()
      .then(({ data }) => {
        const categories = [];

        data?.data?.forEach(category => {
          categories.push(category);
          if (category.sub_categories) categories.push(category.sub_categories);
        });

        const flattenCategories = categories.flat();
        const mapDropdown = flattenCategories?.map(({ id, name }) => ({ value: id, label: name }));
        setDropdown({ category: mapDropdown ?? [], loading: false });
      });
  };

  useEffect(() => {
    fetchParentDropdown();

    return () => setDropdown({ category: [] });;
  }, []);

  return (
    <CustomModal
      title="Edit Category"
      open={modalConfigCategory.show && modalConfigCategory.type === "edit"}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <Select
          name="id"
          loading={dropdown.loading}
          placeholder="Select Category to Edit"
          options={dropdown.category}
          onChange={(opt) => setValues({ ...values, id: opt.value })}
          error={Boolean(errors.id && touched.id)}
          errorMessage={!!(errors?.id && touched.id) ? errors?.id : ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <SuiInput
          name="name"
          placeholder="New Category Name"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>

      <SuiBox display="flex" justifyContent="space-between" alignItems="center" mt={3}>
        <SuiButton
          disabled={Boolean(!values.id)}
          mt={2}
          size="medium"
          color="error"
          onClick={() => setModalDelete({ show: true, data: { id: values.id, title: dropdown?.category?.find(c => c.value === values.id).label ?? "" } })}>
          Delete
        </SuiButton>

        <SuiBox>
          <SuiButton
            variant="text"
            size="small"
            mt={2}
            sx={{ mr: 2 }}
            color="dark"
            onClick={() => setModalConfig({ show: false, data: null })}>
            Cancel
          </SuiButton>

          <SuiButton
            mt={2}
            size="medium"
            color="info"
            onClick={handleSubmit}>
            Save
          </SuiButton>
        </SuiBox>
      </SuiBox>

      {modalDelete.show && (
        <ModalDeleteCategory
          modalConfigCategory={modalDelete}
          setModalConfig={setModalDelete}
          setModalConfigEdit={setModalConfig}
          fetchData={fetchData} />
      )}
    </CustomModal>
  );
}

export default ModalEditCategory;