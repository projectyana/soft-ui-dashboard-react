import {
  Card,
  CardMedia,
  Icon
} from "@mui/material";
import SuiButton from "components/SuiButton";
import getRolePermissions from "utils/getRolePermissions";

const GalleryCard = ({ style, image, alt, onDeleteClick }) => {
  const { isAllowDelete } = getRolePermissions();
  return (
    <Card sx={{ ...style }}>
      {Boolean(image) && (<CardMedia
        sx={{ padding: 0, margin: 0, position: 'relative' }}
        component="img"
        alt={alt}
        height={250}
        image={image}
      />
      )}

      {isAllowDelete && (
        <SuiButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          size="small"
          variant="contained"
          color="error"
          iconOnly
          borderRadius="large"
          onClick={() => onDeleteClick()}
        >
          <Icon>close</Icon>
        </SuiButton>
      )}
    </Card>
  );
};

export default GalleryCard;
