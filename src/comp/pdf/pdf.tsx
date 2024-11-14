import parse from "html-react-parser";
import React, { useRef } from "react";

export default function PdfViewer({ content }) {
  const html: string = content;
  const parsedHTML = parse(html);

  return <>{parsedHTML}</>;
}
