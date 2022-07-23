/* eslint-disable */
import React from 'react';
import {
  Divider,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Slide
} from "@mui/material";

import VisualEditor from "components/Custom/VisualEditor";

const ModalCreatePage = ({ formik, modalCreate, setModalCreate }) => {

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => { setModalCreate({ show: false }); };

  React.useEffect(() => { console.log(modalCreate); }, [modalCreate]);

  return (
    <Dialog
      fullScreen
      open={modalCreate.show}
      onClose={() => setModalCreate({ show: false })}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            {/* <CloseIcon /> */}
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create New Page
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar >
      </AppBar >
      <VisualEditor action="create" formik={formik} />
    </Dialog >
  );
};

export default ModalCreatePage;