import { useEffect, useState } from "react";
import LibraryCard from "../comp/cards/libraryCard";
import fetchFileList, { FileList } from "../util/bucket";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Library(props) {
  const [list, setList] = useState<FileList>({ prefix: "", user_files: [] });
  useEffect(() => {
    let ignore = false;
    fetchFileList().then((res) => {
      if (!ignore) {
        setList(res);
        console.log(res);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          marginBottom: "20px",
          width: "8rem",
          marginLeft: "2rem",
        }}
      >
        Add File
      </Button>
      <div className="flex flex-row flex-wrap ml-8">
        {list.user_files &&
          list.user_files.map((value, index, files) => {
            const postfix = value.slice(value.length - 4, value.length);
            if (postfix && postfix === ".pdf") {
              const image = value.split(".")[0];
              const imageExist = files.includes(image + ".jpeg");
              let imageURL: string | undefined;
              if (imageExist) {
                imageURL = `https://speechable.fra1.cdn.digitaloceanspaces.com/@${list.prefix}/${image}.jpeg`;
              }
              return (
                <LibraryCard filename={value} imageURL={imageURL} key={index} />
              );
            }
          })}
      </div>
    </div>
  );
}
