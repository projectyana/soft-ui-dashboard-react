
import { useFormik, validateYupSchema } from 'formik';
import * as yup from "yup";
import CustomModal from 'components/Custom/Modal';
import GalleryApi from "apis/Gallery"

import React, { useState } from 'react';

import SuiBox from 'components/SuiBox';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';
import InputFile from "./InputFile";






function ModalCreateFile({ fetchData, modalConfigFile, setModalConfig }) {
    const [dataFile, setDataFile] = useState([])


    const handledUploaFile = async () => {
        const formData = new FormData()
        formData.append('file', dataFile[0]?.data)
        console.log('data add', formData)



    }

    const formSubmitHandler = async (values, { setSubmitting }) => {
        const fileLink = await handledUploaFile()
        const finalValue = {
            ...values,
            file: dataFile[0]?.nama

        }


        console.log('submitted', values)
        GalleryApi.create(values)
            .then(({ data }) => {
                setModalConfig(prev => ({ ...prev, show: false }));
                fetchData();
            })
            .catch((err) => window.alert("Error connect to server"));
        console.log('values category', values)
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            icon: ""
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is required!"),
            icon: yup.string().required("Icon is required!"),
        }),
        onSubmit: formSubmitHandler,
    })

    const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;
    console.log(modalConfigFile)


    return (
        <CustomModal
            title="Create new file"
            // open={modalConfig.show && modalConfig.type === 'create'}
            open={modalConfigFile.show && modalConfigFile.type === 'create'}
            setModalConfig={setModalConfig}
        >
            <InputFile dataFile={dataFile} setDataFile={setDataFile} />
            <SuiBox mb={2}>
                <SuiInput
                    name="name"
                    placeholder="File name"
                    onChange={handleChange}
                    value={values.title}
                    error={Boolean(errors.title && touched.title)}
                    errorMessage={errors?.title ?? ""}
                />
            </SuiBox>
            <SuiBox mb={2}>
                <SuiInput
                    name="type"
                    placeholder="type"
                    onChange={handleChange}
                    value={values.icon}
                    error={Boolean(errors.icon && touched.icon)}
                    errorMessage={errors?.icon ?? ""}
                />
            </SuiBox>
            <SuiBox mb={2}>
                <SuiInput
                    name="date"
                    placeholder="date"
                    onChange={handleChange}
                    value={values.icon}
                    error={Boolean(errors.icon && touched.icon)}
                    errorMessage={errors?.icon ?? ""}
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

export default ModalCreateFile;