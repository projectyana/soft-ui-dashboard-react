import { useFormik, validateYupSchema } from 'formik';
import * as yup from "yup";

import CustomModal from 'components/Custom/Modal';
import GalleryApi from "apis/Gallery"

import React from 'react';

import SuiBox from 'components/SuiBox';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';

function ModalEditCategory({ fetchData, modalConfigCategory, setModalConfig }) {
    const { id, title, icon } = modalConfigCategory.data;

    const formSubmitHandler = (values, { setSubmiting }) => {
        GalleryApi.update(id, values)
            .then(({ data }) => {
                setModalConfig(prev => ({ ...prev, show: false }));
                fetchData();
            })
            .catch((err) => window.alert("Error connect to server"));
    };
    const formik = useFormik({
        initialValues: {
            title: title ?? "",
            icon: icon ?? ""
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is required!"),
            icon: yup.string().required("Icon is required!"),
        }),
        onSubmit: formSubmitHandler,
    })

    const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;


    return (
        <CustomModal
            title="Edit Category"
            open={modalConfigCategory.show && modalConfigCategory.type === "edit"}
            setModalConfig={setModalConfig}
        >

            <SuiBox mb={2}>
                <SuiInput
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={values.title}
                    error={Boolean(errors.code && touched.code)}
                    errorMessage={errors?.code ?? ""}
                />
            </SuiBox>
            <SuiBox mb={2}>
                <SuiInput
                    name="icon"
                    placeholder="Icone"
                    onChange={handleChange}
                    value={values.icon}
                    error={Boolean(errors.code && touched.code)}
                    errorMessage={errors?.code ?? ""}
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

        </CustomModal>
    );
}

export default ModalEditCategory;