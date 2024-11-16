import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Skeleton,
} from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import { downloadFilePartialContent } from "../../util/bucket";

export default function LibraryCard({ filename, imageURL, viewPDF }) {
  const theme = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 350,
        boxShadow: 0,
        backgroundColor: "transparent",
        marginRight: "3rem",
      }}
    >
      {imageURL ? (
        <CardMedia
          sx={{ height: 600, borderRadius: 5 }}
          image={imageURL}
          title="file"
          className="cursor-pointer"
          onClick={viewPDF}
        />
      ) : (
        <Skeleton variant="rectangular" width={350} height={600} />
      )}

      <CardContent className={textColor}>
        <Typography gutterBottom variant="h5" component="div">
          {filename}
        </Typography>
      </CardContent>
    </Card>
  );
}
