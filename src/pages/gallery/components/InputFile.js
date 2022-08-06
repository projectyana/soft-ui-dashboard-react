/* eslint-disable */
import {
    useRef,
    useMemo,
    useState,
    useCallback,
} from 'react';

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { Icon } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

const File = ({ fileText, fileUrl, onView, onDownload, onDelete }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <SuiBox
            style={{ position: 'relative', objectFit: 'cover' }}
        // onClick={onView}
        // onMouseEnter={() => setIsHover(true)}
        // onMouseLeave={() => setIsHover(false)}
        >
            {/* Download Button */}
            {/* <ActionButton
            size="sm"
            variant="primary"
            style={{ position: 'absolute', zIndex: 1, right: 20 }}
            className="m-2 shadow"
            onClick={onDownload}
          >
            <IoDownloadOutline />
          </ActionButton> */}

            {/* Delete Button */}
            {/* <button style={{ position: 'absolute', zIndex: 1, top: 15, right: 20 }} >Delete</button> */}
            {/* {TYPE !== 'DETAIL' &&
            <ActionButton
              size="sm"
              variant="danger"
              className="m-2 shadow"
              onClick={onDelete}
            >
              <IoTrashOutline />
            </ActionButton>
          } */}
            <img
                // className={`img-fluid rounded border ${isHover ? 'shadow' : 'shadow-sm'}`}
                style={{ height: 200, width: '100%', objectFit: 'cover', transform: isHover ? 'scale(1.03)' : 'none', transition: 'all 0.1s ease-in-out' }}
                src={fileUrl}
            />
        </SuiBox>
    );
};

const InputFile = ({ dataFile, setDataFile }) => {
    const inputFileRef = useRef();

    // on click select image file
    const onClickFilesHandler = () => inputFileRef.current.click();

    // Handle after pick an image
    const onChangeFileHandler = (e) => {
        const file = e.target.files[0];

        // Check file
        if (!file) return null;

        // get image file extension
        const getFileType = file.type.split('/')[1];

        // check if type images is allowed
        if (['pdf', 'msword', 'vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(getFileType)) {
            const generateName = file.name;
            const generateLink = URL.createObjectURL(file);
            const finalValue = { data: file, nama: generateName, link: generateLink };

            console.log('final value', finalValue)

            setDataFile([finalValue]);
        } else {
            window.alert('File does not supported');
        }
    };


    return (
        <SuiBox borderRadius="lg">
            <div>
                <input
                    ref={inputFileRef}
                    type="file"
                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    style={{ display: 'none' }}
                    onChange={onChangeFileHandler}
                />
                {/* <ActionButton
            text="Tambah Gambar"
            onClick={onClickFilesHandler}
          /> */}
                {/* {TYPE !== 'DETAIL' &&
            <ActionButton
              text="Tambah Gambar"
              onClick={onClickFilesHandler}
            />
          } */}

                <div
                    // fluid
                    // className="bg-light rounded overflow-auto border"
                    onClick={onClickFilesHandler}
                    style={{ cursor: 'pointer', maxHeight: '60vh' }}
                >
                    <Icon className="d-flex justify-end" style={{ cursor: 'pointer' }}>delete</Icon>

                    {dataFile && dataFile.length > 0
                        ? <div style={{
                            background: "#f8f9fa",
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', height: "40vh", flexDirection: 'column'
                        }}>
                            <PostAddIcon />
                            {dataFile.map((val, index) => (

                                <SuiTypography variant="body2" color="dark" fontWeight="light"
                                >{val.nama}</SuiTypography>


                            ))}


                        </div>
                        : <div
                            style={{
                                background: "#f8f9fa",
                                cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', height: "40vh"
                                , flexDirection: 'column'
                            }}>
                            <PostAddIcon />
                            <SuiTypography variant="body2" color="dark" fontWeight="light"
                            >Click to select image/file</SuiTypography>
                        </div>
                    }
                </div>
            </div>
        </SuiBox >

    );
};

export default InputFile;