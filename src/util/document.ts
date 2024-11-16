import { server } from "./bucket";

export interface Progress {
  current_page: number;
}

export interface DownloadedHTMLFile {
  file: string;
  page_number: string;
}

export async function getUserFileProgress(filename: string): Promise<Progress> {
  const data = await fetch(
    `${server}/api/progress/current?filename=${filename}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const progress: Promise<Progress> = await data.json();
  return progress;
}

export async function ProgressToPage(
  filename: string,
  num: number,
  setChildren: CallableFunction,
) {
  const data = await fetch(`${server}/api/progress`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ file: filename, page_number: String(num) }),
    headers: {
      "Content-Type": "aplication/json",
    },
  });
  const html = await data.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.getElementsByTagName("body")[0];
  setChildren(body.innerHTML.toString());
}

export async function fetchFileAsHTML(
  filename: string,
  progress: string,
): Promise<string> {
  const hFile: DownloadedHTMLFile = {
    file: filename,
    page_number: progress,
  };
  const data = await fetch(`${server}/api/download`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(hFile),
  });
  const html = data.text();
  return html;
}
