import { useContext, useEffect, useState } from "react";
import LibraryCard from "../comp/cards/libraryCard";
import fetchFileList, { FileList, uploadFile } from "../util/bucket";
import AddIcon from "@mui/icons-material/Add";
import { MuiFileInput } from "mui-file-input";
import { useFilePicker } from "use-file-picker";
import { ThemeContext } from "../App";

export default function Library(props) {
  const [list, setList] = useState<FileList>({ prefix: "", user_files: [] });
  const [file, setFile] = useState<File | null>();
  const theme = useContext(ThemeContext);

  const { openFilePicker } = useFilePicker({
    accept: ".pdf, .txt, .doc, .docx",
    onFilesSelected: ({ plainFiles }) => {
      uploadFile(plainFiles[0]).then(() => setFile(plainFiles[0]));
    },
  });

  useEffect(() => {
    let ignore = false;
    fetchFileList().then((res) => {
      if (!ignore) {
        setList(res);
      }
    });

    return () => {
      ignore = true;
    };
  }, [file]);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => openFilePicker()}
        className={`w-28 ml-8 mb-8 outline ${theme === "dark" ? "bg-black text-white " : "bg-white text-black"}`}
      >
        <AddIcon />
        New
      </button>
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
