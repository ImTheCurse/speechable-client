export interface FileList {
  prefix: string;
  user_files: string[];
}

export interface PageContent {
  currentContent: string;
  nextContent: string;
  prevContent: string;
}

export const server = "http://localhost:3000";

export default async function fetchFileList(): Promise<FileList> {
  const data = await fetch(`${server}/api/files`, {
    method: "GET",
    credentials: "include",
  });
  const list: Promise<FileList> = data.json();

  return list;
}
export async function uploadFile(file: File | null) {
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append("upload", file);
  await fetch(`${server}/api/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
}

export async function downloadFilePartialContent(
  filename: string,
): Promise<PageContent> {
  const contentData = {
    file: filename,
  };
  const data = await fetch(`${server}/api/download`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(contentData),
  });
  const content: Promise<PageContent> = data.json();
  content.then((res) => console.log(res));

  return content;
}
