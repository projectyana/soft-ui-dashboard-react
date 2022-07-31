import {
  Divider,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SuiBox from "components/SuiBox";

const BlogCard = ({ children, style, image, alt, title, slug, tags, author }) => {
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
        <SuiBox sx={{ width: '100%' }} display="flex" justifyContent="end">
          <Typography gutterBottom variant="body2" component="div">
            {author}
          </Typography>
        </SuiBox>
        <Divider />
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
