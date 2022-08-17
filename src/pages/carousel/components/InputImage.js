/* eslint-disable */
import {
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

const Image = ({ imageText, imageUrl, onView, onDownload, onDelete }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <SuiBox style={{ position: 'relative', objectFit: 'cover' }} >
      <img
        style={{ height: 200, width: '100%', objectFit: 'cover', transform: isHover ? 'scale(1.03)' : 'none', transition: 'all 0.1s ease-in-out' }}
        src={imageUrl}
      />
    </SuiBox>
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
        <div
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          onClick={onClickFilesHandler}
          style={{
            borderRadius: '10px',
            backgroundColor: '#c9ced7',
            cursor: 'pointer',
            maxHeight: '60vh',
            height: 200,
            width: "100%"
          }}
        >
          {dataGambar && dataGambar.length > 0
            ? <div>
              {dataGambar.map((val, index) => (
                <Image
                  key={index}
                  imageText={val.nama}
                  imageUrl={val.link}
                />
              ))}
            </div>
            :
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

          }
        </div>
      </div>
    </SuiBox>
  );
};

export default InputImage;