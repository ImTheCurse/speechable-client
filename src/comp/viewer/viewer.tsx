import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBackOutlined, ArrowForwardOutlined } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { forwardRef, useEffect, useState } from "react";
import { getUserFileProgress } from "../../util/document";
import PdfViewer from "../pdf/pdf";
import { ProgressToPage } from "../../util/document";
import { fetchCurrentAudio } from "../util/audio";
import { fetchFileAsHTML } from "../../util/document";

export function Viewer({
  open,
  filename,
  handleClose,
  progress,
  children,
  setChildren,
  setProgress,
  PdfComp,
}) {
  const [playing, setPlaying] = useState(false);
  const handlePause = () => setPlaying(!playing);
  return (
    <Dialog open={open} onClose={handleClose} scroll="paper" fullScreen={true}>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <DescriptionIcon />
        {filename}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>

      <DialogContent dividers={true} className="flex justify-center">
        <PdfComp
          filename={filename}
          progress={progress}
          children={children}
          setProgress={setProgress}
          setChildren={setChildren}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="primary"
          onClick={() => ProgressToPage(filename, progress - 1, setChildren)}
        >
          <ArrowBackOutlined className="text-black " />
        </IconButton>

        <IconButton onClick={handlePause}>
          {playing ? (
            <PauseIcon className="text-black" />
          ) : (
            <PlayArrowIcon className="text-black" />
          )}
        </IconButton>

        <IconButton
          color="primary"
          onClick={() => ProgressToPage(filename, progress + 1, setChildren)}
        >
          <ArrowForwardOutlined className="text-black " />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
