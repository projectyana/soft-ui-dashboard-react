/* eslint-disable */
import { useRef, useMemo, useState, useCallback, } from 'react';

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { Icon } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';

const Image = ({ imageText, imageUrl, onView, onDownload, onDelete }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <SuiBox style={{ position: 'relative', objectFit: 'cover' }} >
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
        style={{ height: 200, width: '100%', objectFit: 'cover', transform: isHover ? 'scale(1.03)' : 'none', transition: 'all 0.1s ease-in-out' }}
        src={imageUrl}
      />
    </SuiBox>
  );
};

const InputImage = ({ dataGambar, setDataGambar }) => {
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
    if (['jpg', 'png', 'jpeg'].includes(getFileType)) {
      const generateName = file.name;
      const generateLink = URL.createObjectURL(file);
      const finalValue = { data: file, nama: generateName, link: generateLink };

      setDataGambar([finalValue]);
    } else {
      window.alert('Image does not supported (.jpg, .png, .gif, .jpeg)');
    }
  };


  return (
    <SuiBox borderRadius="lg">
      <div>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/png, image/gif, image/jpeg, image/jpg"
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
          {dataGambar && dataGambar.length > 0
            ? <div>
              {dataGambar.map((val, index) => (
                <Image
                  key={index}
                  imageText={val.nama}
                  imageUrl={val.link}
                // onDelete={e => {
                //   e.stopPropagation();
                //   setModalDeleteConfig({
                //     show: true,
                //     loading: false,
                //     index: index
                //   });
                // }}
                >
                </Image>

              ))}

            </div>
            : <div className="d-flex align-items-center justify-center"
              style={{
                background: "#f8f9fa",
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', height: "40vh",
                flexDirection: 'column'
              }}>
              <PanoramaIcon></PanoramaIcon>
              <SuiTypography variant="body2" color="dark" fontWeight="light"
              >Click to select image/file</SuiTypography>
            </div>
          }
        </div>
      </div>
    </SuiBox >

  );
};

export default InputImage;