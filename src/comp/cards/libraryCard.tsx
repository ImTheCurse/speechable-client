import { Card, CardMedia, CardContent, Typography } from "@mui/material";
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
      <CardMedia
        sx={{ height: 600, borderRadius: 5 }}
        image={imageURL}
        title="file"
        className="cursor-pointer"
        onClick={viewPDF}
      />
      <CardContent className={textColor}>
        <Typography gutterBottom variant="h5" component="div">
          {filename}
        </Typography>
      </CardContent>
    </Card>
  );
}
