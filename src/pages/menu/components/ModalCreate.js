/* eslint-disable */
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import MenuApi from "apis/Menu";
import Select from "components/Custom/Select";
import CustomModal from "components/Custom/Modal";
import SuiTypography from "components/SuiTypography";
import { OtherHouses } from "@mui/icons-material";
import ModalCreatePage from "./ModalCreatePage";

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  const data = [];
  const [modalCreate, setModalCreate] = useState({ show: false });
  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    console.log(values);
    // MenuApi.create(values)
    //   .then(({ data }) => {
    //     setModalConfig(prev => ({ ...prev, show: false }));
    //     fetchData();
    //   })
    //   .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      menu_state: "parent",
      id_parent: "",            // id_parent is required when menu_state is sub 
      menu_type: "page",        // page, blog, link 
      link: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Menu Name is required!"),
      menu_state: yup.string().required("Menu State is required!"),
      id_parent: yup.string().when('menu_state', {
        is: (menu_state) => Boolean(menu_state === 'sub'),
        then: yup.string().required("Parent Menu is required!")
      }),
      menu_type: yup.string().required("Menu Type is required!"),
      link: yup.string().when('menu_type', {
        is: (menu_type) => Boolean(menu_type === 'link'),
        then: yup.string().required("Link is required!")
      }),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, handleSubmit } = formik;

  return (
    <CustomModal
      title="Create Menu"
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

      <SuiBox mb={2}>
        <FormControl>
          <FormLabel id="menu_state">
            <SuiTypography variant="subtitle2">
              Create menu as
            </SuiTypography>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="menu_state"
            name="menu_state"
            value={values.menu_state}
            onChange={handleChange}
          >
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="parent" control={<Radio />} label="Parent" />
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="sub" control={<Radio />} label="Sub Parent" />
          </RadioGroup>
        </FormControl>
      </SuiBox>

      <SuiBox mb={2}>
        {/* Show select dropdown if menu_state equals sub (User create sub parent menu)*/}
        {Boolean(values.menu_state === "sub") && (
          <Select
            placeholder="Select Parent Menu"
            option={data}
            defaultValue={data?.find(item => item.value === values.id_parent)}
            onChange={(option) => setValues({ ...values, id_parent: option.value })}
            error={Boolean(errors.id_parent && touched.id_parent)}
            errorMessage={errors?.id_parent ?? ""}
          />
        )}
      </SuiBox>

      <SuiBox mb={2}>
        <FormControl>
          <FormLabel id="menu_type">
            <SuiTypography variant="subtitle2">
              Choose menu type
            </SuiTypography>
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="menu_type"
            name="menu_type"
            value={values.menu_type}
            onChange={handleChange}
          >
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="page" control={<Radio />} label="Page" />
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="blog" control={<Radio />} label="Blog" />
            <FormControlLabel sx={{ marginX: 1 }} size="small" value="link" control={<Radio />} label="Link" />
          </RadioGroup>
        </FormControl>
      </SuiBox>

      <SuiBox mb={2}>
        {/* Show select dropdown if user choose blog/page */}
        {Boolean(values.menu_type === "page" || values.menu_type === "blog") && (
          <Select
            placeholder={`Select ${values.menu_type}`}
            option={data}
            defaultValue={data?.find(item => item.value === values.unique_id)}
            onChange={(option) => setValues({
              ...values,
              unique_id: option.value,
              content: option.id,
              type: option.type
            })}
            error={Boolean(errors.content && touched.content)}
            errorMessage={errors?.content ?? ""}
          />
        )}

        {values.menu_type === "link" && (
          <SuiInput
            name="link"
            placeholder="https://"
            onChange={handleChange}
            value={values.link}
            error={Boolean(errors.link && touched.link)}
            errorMessage={errors?.link ?? ""}
          />
        )}
      </SuiBox>

      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
        <SuiButton
          mt={2}
          size="medium"
          color="info"
          onClick={() => setModalCreate({ show: true })}>
          test
        </SuiButton>
        <SuiButton
          mt={2}
          size="medium"
          color="info"
          onClick={handleSubmit}>
          Save
        </SuiButton>
      </SuiBox>

      {/* modalCreate */}
      {modalCreate.show && (
        <ModalCreatePage formik={formik} modalCreate={modalCreate} setModalCreate={setModalCreate} />
      )}
    </CustomModal>);
};

export default ModalCreate;