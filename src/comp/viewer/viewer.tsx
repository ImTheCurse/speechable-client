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
import { useEffect, useRef, useState } from "react";
import { ProgressToPage } from "../../util/document";
import { fetchCurrentAudio } from "../../util/audio";

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
  const [initAudioStart, setInitAudioStart] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [audioElem, setAudioElem] = useState(<audio />);
  const audioRef = useRef(null);

  const handlePause = () => setPlaying(!playing);

  useEffect(() => {
    let ignore = false;

    if (initAudioStart || audioRef.current.ended) {
      setInitAudioStart(false);
      fetchCurrentAudio("insane world of programming skills").then((res) => {
        setAudioElem(
          <audio src={`data:audio/mpeg;base64,${res}`} ref={audioRef} />,
        );
      });

      return () => {
        ignore = true;
      };
    }
    if (playing) {
      audioRef.current.play();
      return () => {
        ignore = true;
      };
    }
    audioRef.current.pause();
    return () => {
      ignore = true;
    };
  }, [playing, audioElem]);

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
        {audioElem}
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
