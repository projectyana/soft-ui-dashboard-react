import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ImageCard = ({ children, style, image, alt, title, description }) => {
  return (
    <Card sx={{ ...style }}>
      <CardMedia
        component="img"
        alt={alt}
        height="140"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default ImageCard;
