/* eslint-disable */
import { useRef } from 'react';
import {
  Tooltip,
  Icon
} from "@mui/material";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

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

    // check if type file is allowed
    if (['pdf', 'xls', 'xlsx'].includes(getFileType)) {
      const generateName = file.name;
      const generateLink = URL.createObjectURL(file);
      const finalValue = { data: file, nama: generateName, link: generateLink };

      setDataFile(finalValue);
    } else {
      window.alert('File does not supported (.pdf, .xls, .xlsx)');
    }
  };


  return (
    <SuiBox borderRadius="lg">
      <SuiBox display="flex" justifyContent="start" alignItems="center">
        <input
          ref={inputFileRef}
          type="file"
          accept=".pdf, .xls, .xlsx"
          style={{ display: 'none' }}
          onChange={onChangeFileHandler}
        />

        <SuiBox sx={{ width: '60%' }} bgColor="light" p={1} mr={2} borderRadius="lg">
          <SuiTypography variant="h6">
            {dataFile?.nama ?? "Choose a file to upload"}
          </SuiTypography>
        </SuiBox>

        <Tooltip title="Choose a file to upload">
          <SuiButton
            rounded="lg"
            sx={{ marginTop: 0.5, marginLeft: 1 }}
            iconOnly
            size="medium"
            color="info"
            onClick={onClickFilesHandler}>
            <Icon>add</Icon>
          </SuiButton>
        </Tooltip>
      </SuiBox>
    </SuiBox >
  );
};

export default InputFile;