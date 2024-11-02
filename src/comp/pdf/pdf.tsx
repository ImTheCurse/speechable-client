import pdfFile from "../../../assets/react-starter.pdf";
import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { ThemeContext } from "../../App";
import { pdfjs } from "react-pdf";
import parse from "html-react-parser";

export default function PdfViewer({ content }) {
  const html: string = content;

  return <>{parse(html)}</>;
}
