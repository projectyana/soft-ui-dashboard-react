import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const BlogCard = ({ children, style, image, alt, title, slug, tags }) => {
  return (
    <Card sx={{ ...style }}>
      {Boolean(image) && (<CardMedia
        component="img"
        alt={alt}
        height="140"
        image={image}
      />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tags}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default BlogCard;
