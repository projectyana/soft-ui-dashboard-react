
// Gallery Page

import React, { useEffect, useState } from "react";

// @mui material components
import {
    Icon,
    Switch,
    Tooltip,
    CardActions,
    Grid
} from "@mui/material";

import GalleryApi from 'apis/Gallery'
import { useFormik } from "formik";


import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';

import ImageCard from "components/Custom/Card/ImageCard";
import Select from "components/Custom/Select";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModalUpdate from "./components/ModalUpdate";
import ModalCreate from "./components/ModalCreate";






function Gallery(props) {
    const [fetchStatus, setFetchStatus] = useState({ loading: true });
    const [data, setData] = useState([]);
    // const [mediaType, setMediaType] = useState("")
    const [modalConfig, setModalConfig] = useState({
        type: "create",    // create | edit | delete | configure
        show: false,
        data: null
    });
    const options = [
        {
            value: "file",
            label: "File"
        },
        {
            value: "image",
            label: "Image"
        }
    ]

    const fetchData = () => {
        setFetchStatus({ loading: true })

        GalleryApi.get()
            .then((res) => {
                const mapData = res?.data?.data?.map((item) => ({
                    ...item,
                    link: `https://api.rokom.xyz/${item.url}`
                }));
                setData(mapData ?? [])
            })
            .catch((err) => window.alert(err.message))
            .finally(() => setFetchStatus({ loading: false }))
    }

    const handleToggleActive = (row, index) => {
        GalleryApi.update(row.id, { ...row, active: !row.active })
            .then(() => {
                const newData = [...data];
                const value = newData[index];
                value.active = !row.active

                setData(newData);
            })
            .catch(() => window.alert("Error connect to server"))
    }

    const formik = useFormik({
        initialValues: {
            mediaType: ""
        }
    })

    const { setFieldValue, handleChange } = formik

    useEffect(() => {
        fetchData();
        console.log('value', options.value)
        console.log('change value', setFieldValue)



        return () => { setData([]); };
    }, [])



    return (
        <DashboardLayout>
            <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
                <SuiButton size="medium" color="info"
                    onClick={() => setModalConfig({ show: true, type: 'create' })}
                >
                    Create
                </SuiButton>
            </SuiBox>
            <SuiBox sx={{ minWidth: 120 }} display="flex" justifyContent="end" alignItems="center">
                <Select
                    placeholder="Select file or image"
                    option={options}
                    // value={options.value}
                    onChange={(option) => {
                        setFieldValue('mediaType', option.value)
                    }}

                />
            </SuiBox>
            <Grid container spacing={2} mt={2}>
                <SuiBox display="flex" justifyContent="space-between">
                    <SuiTypography variant="h2">Categories</SuiTypography>
                    <SuiButton style={{ background: "none" }}>
                        <ControlPointIcon style={{ height: "auto", cursor: "pointer" }} />
                    </SuiButton>
                </SuiBox>
                {data?.length > 0 && data.map((row, index) => (
                    <Grid key={row.title} item xs={6} md={3}>
                        <ImageCard
                            style={{ marginRight: 2 }}
                            alt={row.title}
                            image={row.icon}
                            title={row.title}
                            description={row.description}
                        >
                            <CardActions>
                                {/* <SuiBox>
                                    <Tooltip
                                        title={row?.active ? 'Caroursel is enabled' : 'Coursel is disabled'}
                                    >
                                        <Switch
                                            checked={row?.active ?? false}
                                            onChange={() => handleToggleActive(row, index)}
                                        />
                                    </Tooltip>
                                </SuiBox> */}
                                <SuiBox >
                                    <SuiButton
                                        size="small"
                                        variant="text"
                                        color="dark"
                                        onClick={() => setModalConfig({ show: true, type: "edit", data: row })}
                                    >
                                        <Icon>edit</Icon>&nbsp;edit
                                    </SuiButton>
                                </SuiBox>
                                <SuiBox >
                                    <SuiButton
                                        size="small"
                                        variant="text"
                                        color="error"
                                        onClick={() => setModalConfig({ show: true, type: "delete", data: row })}
                                    >
                                        <Icon>delete</Icon>&nbsp;delete
                                    </SuiButton>
                                </SuiBox>

                            </CardActions>

                        </ImageCard>


                    </Grid>
                ))
                }

            </Grid >

            {/* Modal  Create */}
            {modalConfig.show && modalConfig.type === "create" && <ModalCreate
                fetchData={fetchData}
                modalConfig={modalConfig}
                setModalConfig={setModalConfig}
            />}
            {/* Modal Update */}
            {modalConfig.show && modalConfig.type === "edit" && <ModalUpdate
                fetchData={fetchData}
                modalConfig={modalConfig}
                setModalConfig={setModalConfig}
            />}


        </DashboardLayout>
    );
}

export default Gallery;