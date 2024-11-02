import { forwardRef, useContext, useEffect, useState } from "react";
import LibraryCard from "../comp/cards/libraryCard";
import fetchFileList, { FileList, uploadFile } from "../util/bucket";
import AddIcon from "@mui/icons-material/Add";
import { useFilePicker } from "use-file-picker";
import { ThemeContext } from "../App";
import PdfViewer from "../comp/pdf/pdf";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { fetchFileAsHTML, getUserFileProgress } from "../util/document";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBackOutlined, ArrowForwardOutlined } from "@mui/icons-material";

export default function Library(props) {
  const [list, setList] = useState<FileList>({ prefix: "", user_files: [] });
  const [file, setFile] = useState<File | null>();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(1);
  const [filename, setFilename] = useState("");
  const [children, setChildren] = useState("");
  const handleOpen = (name: string) => {
    setOpen(true);
    setFilename(name);
  };
  const handleClose = () => setOpen(false);
  const theme = useContext(ThemeContext);

  const PdfComp = forwardRef<HTMLDivElement>((props, ref) => {
    useEffect(() => {
      let ignore = false;
      getUserFileProgress(filename).then((res) => {
        if (!ignore) {
          if (res.current_page == 0) {
            setProgress(1);
            return;
          }
          setProgress(res.current_page);
        }
      });
      fetchFileAsHTML(filename, String(progress)).then((res) => {
        if (!ignore) {
          //convert text to html
          const parser = new DOMParser();
          const doc = parser.parseFromString(res, "text/html");
          const body = doc.getElementsByTagName("body")[0];

          setChildren(body.innerHTML.toString());
        }
      });

      return () => {
        ignore = true;
      };
    }, []);
    return (
      <div ref={ref} {...props} className="">
        {<PdfViewer content={children} />}
      </div>
    );
  });

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
                <LibraryCard
                  filename={value}
                  imageURL={imageURL}
                  key={index}
                  viewPDF={() => {
                    handleOpen(value);
                  }}
                />
              );
            }
          })}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullScreen={true}
      >
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <DescriptionIcon />
          {filename}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>

        <DialogContent dividers={true} className="flex justify-center">
          <PdfComp />
        </DialogContent>

        <DialogActions>
          <div className="flex bg-black mx-auto ">
            <IconButton color="primary">
              <ArrowBackOutlined className="text-white" />
            </IconButton>

            <IconButton color="primary">
              <ArrowForwardOutlined className="text-white" />
            </IconButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
