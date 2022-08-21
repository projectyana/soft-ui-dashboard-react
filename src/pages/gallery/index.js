/* eslint-disable */

// Gallery Page
import React, { useState } from "react";
import {
  Icon,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip
} from "@mui/material";

import CollectionsIcon from '@mui/icons-material/Collections';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import getRolePermissions from "utils/getRolePermissions";

// View Toggle
import CategoriesView from "./components/categories_view";
import FilesView from "./components/files_view";

function DropdownButtonCreate({ setModalCreate }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClickGallery = () => {
    setModalCreate({ show: true, type: 'gallery' });
    handleClose();
  };

  const handleClickFile = () => {
    setModalCreate({ show: true, type: 'file' });
    handleClose();
  };

  return (
    <div>
      <SuiButton
        size="medium"
        color="info"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Create&nbsp;
        <Icon>arrow_drop_down</Icon>
      </SuiButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >

        <MenuItem onClick={handleClickGallery}>
          <ListItemIcon>
            <Icon size="medium">image</Icon>
          </ListItemIcon>
          &nbsp;Add New Image Gallery
        </MenuItem>

        <MenuItem onClick={handleClickFile}>
          <ListItemIcon>
            <Icon>description</Icon>
          </ListItemIcon>
          &nbsp;Add New File
        </MenuItem>
      </Menu>
    </div>
  );
}

function Gallery() {
  const { isAllowWrite } = getRolePermissions();
  const [showType, setShowType] = useState('gallery');
  const [modalCreate, setModalCreate] = useState({ show: false, type: 'gallery' });

  const toggleType = (event, newType) => {
    if (newType !== null) {
      setShowType(newType);
    }
  };

  return (
    <DashboardLayout>
      {/* Button Create Image / File */}
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">

        {isAllowWrite && (
          <DropdownButtonCreate
            modalCreate={modalCreate}
            setModalCreate={setModalCreate}
          />
        )}

        <ToggleButtonGroup
          sx={{ marginLeft: 2 }}
          value={showType}
          exclusive
          onChange={toggleType}
        >
          <ToggleButton value="gallery">
            <Tooltip title="Show Galleries">
              <CollectionsIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="file">
            <Tooltip title="Show Files">
              <InsertDriveFileIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </SuiBox>

      <SuiBox sx={{ display: showType === "gallery" ? "block" : "none" }}>
        <CategoriesView modalCreate={modalCreate} setModalCreate={setModalCreate} />
      </SuiBox>

      <SuiBox sx={{ display: showType === "file" ? "block" : "none" }}>
        <FilesView modalCreate={modalCreate} setModalCreate={setModalCreate} />
      </SuiBox>
    </DashboardLayout>
  );
}

export default Gallery;
