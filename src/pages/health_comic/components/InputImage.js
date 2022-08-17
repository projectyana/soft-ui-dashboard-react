/* eslint-disable */
import {
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Grid, CardMedia } from '@mui/material';
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

const Image = ({ imageText, imageUrl, onView, onDownload, onDelete }) => {
  return (
    <div style={{ position: 'relative', width: 'auto', objectFit: 'cover', borderRadius: '10px' }} >
      <img
        style={{ objectFit: 'cover' }}
        height="200"
        width="100%"
        src={imageUrl}
      />
    </div>
  );
};

const InputImage = ({ dataGambar, setDataGambar }) => {
  const inputFileRef = useRef();
  const MAX_SIZE_KB = 3072;

  // on click select image file
  const onClickFilesHandler = () => inputFileRef.current.click();

  // Handle after pick an image
  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];
    const fileSizeInKB = file.size / 1024;

    // Check file
    if (!file) return null;

    if (fileSizeInKB > MAX_SIZE_KB) {
      return window.alert(`File size must be less than ${MAX_SIZE_KB / 1024}MB`);
    }

    // get image file extension
    const getFileType = file.type.split('/')[1];

    // check if type images is allowed
    if (['jpg', 'png', 'jpeg'].includes(getFileType)) {
      const generateName = file.name;
      const generateLink = URL.createObjectURL(file);
      const finalValue = { data: file, nama: generateName, link: generateLink };

      setDataGambar(prev => [...prev, finalValue]);
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

        <div
          onClick={onClickFilesHandler}
          style={{
            borderRadius: '10px',
            backgroundColor: '#c9ced7',
            cursor: 'pointer',
            height: 'auto',
            width: "100%",
            padding: '15px',
          }}
        >
          <Grid container justify="space-around " spacing={2}>
            {dataGambar && dataGambar.length > 0
              ? dataGambar.map((row, index) => (
                <Grid key={row.nama} item xs={6} md={4}>
                  <Image
                    key={index}
                    imageText={row.nama}
                    imageUrl={row.link}
                  />
                </Grid>
              ))
              : (
                <div
                  style={{
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#c9ced7',
                    cursor: 'pointer',
                    maxHeight: '60vh',
                    height: 200,
                    width: "100%"
                  }}
                >
                  <SuiTypography variant="body2" color="dark" fontWeight="light">Click to select image</SuiTypography>
                </div>
              )
            }
          </Grid>
        </div>
      </div>
    </SuiBox>
  );
};

export default InputImage;