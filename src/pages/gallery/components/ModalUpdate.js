import CustomModal from 'components/Custom/Modal';


import GalleryApi from "apis/Gallery"



import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import InputImage from 'pages/carousel/components/InputImage';
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";


function ModalUpdate({ fetchData, modalConfig, setModalConfig }) {
    const { id, link, title, slug, body, url, icon, tags } = modalConfig?.data ?? {};
    const [dataGambar, setDataGambar] = useState([{ link }]);

    const handleUploadImage = async () => {
        const formData = new FormData()
        formData.append('image', dataGambar[0]?.data);
        console.log('data add', formData)

        return GalleryApi.addFile(formData)
            .then((res) => res?.data)
            .catch((err) => { });
    }

    const formSubmitHandler = async (values, { setSubmitting }) => {
        const finalValue = { ...values };

        if (dataGambar[0]?.data) {
            const imageLink = await handleUploadImage();
            finalValue.image = dataGambar[0]?.nama;
            finalValue.url = imageLink;
        }

        GalleryApi.update(id, finalValue)
            .then(({ data }) => {
                setModalConfig(prev => ({ ...prev, show: false }))
                fetchData()
            })
            .catch((err) => window.alert("Error connect to server"));
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            type: "",
            total: 0,
        },

        validationSchema: yup.object().shape({
            name: yup.string().required("Name is required"),
            category: yup.string().required("Category is required"),
            type: yup.string().required("Type is required"),
            total: yup.string().required("Total is required")
        }),
        onSubmit: formSubmitHandler,
    })

    const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

    return (
        <CustomModal
            title="Update Gallery"
            open={modalConfig.show && modalConfig.type === 'edit'}
            setModalConfig={setModalConfig}
        >

            <InputImage setDataGambar={dataGambar} dataGambar={dataGambar} />

            <SuiBox mt={3} mb={2}>
                <SuiInput
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={values.name}
                    error={Boolean(errors.name && touched.name)}
                    errorMessage={errors?.name ?? ""}
                >


                </SuiInput>
            </SuiBox>

            <SuiBox mb={2}>
                <SuiInput
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    value={values.category}
                    error={Boolean(errors.category && touched.category)}
                    errorMessage={errors?.category ?? ""}
                />
            </SuiBox>

            <SuiBox mb={2}>
                <SuiInput
                    name="type"
                    placeholder="Type"
                    onChange={handleChange}
                    value={values.type}
                    error={Boolean(errors.type && touched.type)}
                    errorMessage={errors?.type ?? ""}
                />
            </SuiBox>
            <SuiBox mb={2}>
                <SuiInput
                    name="total"
                    placeholder="Total"
                    onChange={handleChange}
                    value={values.total}
                    error={Boolean(errors.total && touched.total)}
                    errorMessage={errors?.total ?? ""}
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
        </CustomModal>

    );
}

export default ModalUpdate;