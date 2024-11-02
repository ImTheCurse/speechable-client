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
