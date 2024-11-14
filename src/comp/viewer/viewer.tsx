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
import { XMLParser } from "react-xml-parser";

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
  const [audioIndex, setAudioIndex] = useState(0);
  const [text, setText] = useState<HTMLCollection>();
  const [audioElem, setAudioElem] = useState(<audio />);
  const [currAudioTime, setCurrAudioTime] = useState(0); //in seconds

  const audioRef = useRef(null);

  const handlePause = () => setPlaying(!playing);
  const handleEndedAudio = () => setAudioIndex((c) => c + 1);

  useEffect(() => {
    let ignore = false;
    const parser = new DOMParser();
    const body = parser.parseFromString(children, "text/html");
    const p = body.getElementsByTagName("p");
    setText(p);
    setAudioIndex(0);

    return () => {
      ignore = true;
    };
  }, [children]);

  useEffect(() => {
    let ignore = false;

    if (!playing) {
      if (audioRef !== null && audioRef.current !== null) {
        audioRef.current.pause();
      }
      return () => (ignore = true);
    }

    if (text?.length > 0) {
      fetchCurrentAudio(
        text[audioIndex] === null ? "" : text[audioIndex].textContent,
      ).then((res) => {
        const elem = (
          <audio
            src={`data:audio/mpeg;base64,${res}`}
            onEnded={handleEndedAudio}
            ref={audioRef}
            autoPlay
          />
        );
        setAudioElem(elem);
      });
    }

    return () => {
      ignore = true;
    };
  }, [playing, text, audioIndex]);

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
