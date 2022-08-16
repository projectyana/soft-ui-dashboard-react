/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

import SuiBox from 'components/SuiBox';
import SuiInput from 'components/SuiInput';
import SuiTypography from 'components/SuiTypography';
import SuiButton from 'components/SuiButton';
import CustomModal from 'components/Custom/Modal';
import { Select } from 'components/Custom/Select';

import FileUploadApi from "apis/FileUpload";

function ModalCreateCategory({ fetchData, modalConfigCategory, setModalConfig }) {
  const [dropdown, setDropdown] = useState({
    parent_category: []
  });

  const formSubmitHandler = (values, { setSubmitting }) => {
    (values.category_type === "parent")
      ? FileUploadApi.createCategory({ name: values.name })
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"))
      : FileUploadApi.createSubCategory(values.id_parent, { name: values.name })
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category_type: "parent",
      id_parent: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required!"),
      id_parent: yup.string().when('category_type', {
        is: (category_type) => Boolean(category_type === 'sub'),
        then: yup.string().required("Parent Category is required!")
      }),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, isSubmitting, handleSubmit } = formik;

  const fetchParentDropdown = () => {
    FileUploadApi.getCategories()
      .then(({ data }) => {
        const mapDropdown = data.data.map(({ id, name }) => ({ value: id, label: name }));
        setDropdown({ parent_category: mapDropdown ?? [] });
      });
  };

  useEffect(() => {
    fetchParentDropdown();

    return () => setDropdown({ parent_category: [] });;
  }, []);

  return (
    <CustomModal
      title="Create new file category"
      open={modalConfigCategory.show && modalConfigCategory.type === 'create'}
      setModalConfig={setModalConfig}
    >
      <SuiBox mb={2}>
        <SuiInput
          name="name"
          placeholder="Category Name"
          onChange={handleChange}
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          errorMessage={errors?.name ?? ""}
        />
      </SuiBox>

      <SuiBox mb={2}>
        <FormControl>
          <FormLabel id="category_type">
            <SuiTypography variant="subtitle2">
              Create New Category as
            </SuiTypography>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="category_type"
            name="category_type"
            value={values.category_type}
            onChange={handleChange}
          >
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="parent" control={<Radio />} label="Parent Category" />
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="sub" control={<Radio />} label="Subcategory" />
          </RadioGroup>
        </FormControl>
      </SuiBox>

      <SuiBox mb={2}>
        {/* Show select dropdown if user choose blog/page */}
        {!!(values.category_type === "sub") && (
          <Select
            key={values.category_type}
            placeholder="Select Parent Category"
            option={dropdown.parent_category}
            defaultValue={dropdown?.parent_category?.find(item => item?.value === values.id_parent)}
            onChange={(option) => setValues({
              ...values,
              id_parent: option.value
            })}
            menuPosition="fixed"
            error={Boolean(errors.id_parent && touched.id_parent)}
            errorMessage={!!(errors?.id_parent && touched?.id_parent) ? errors.id_parent : ""}
          />
        )}
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
    </CustomModal>
  );
}

export default ModalCreateCategory;