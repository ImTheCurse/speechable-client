import parse from "html-react-parser";

export default function PdfViewer({ content }) {
  const html: string = content;

  return <>{parse(html)}</>;
}
