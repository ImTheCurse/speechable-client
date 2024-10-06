import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function LibraryCard() {
  return (
    <Card sx={{ maxWidth: 350, boxShadow: 0, backgroundColor: "transparent" }}>
      <CardMedia
        sx={{ height: 600, borderRadius: 5 }}
        image="https://ddz4ak4pa3d19.cloudfront.net/cache/36/cd/36cdd6fd3c54fdd8e6f175d37edff863.jpg"
        title="movie"
      />
      <CardContent sx={{ color: "white" }}>
        <Typography gutterBottom variant="h5" component="div">
          Gold
        </Typography>
        <Typography variant="body2">
          A technical and artistic showcase, focused on highly stylized
          rendering and animation workflows using Geometry Node tools.
        </Typography>
      </CardContent>
    </Card>
  );
}
