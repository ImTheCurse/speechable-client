export interface FileList {
  prefix: string;
  user_files: string[];
}

export default async function fetchFileList(): Promise<FileList> {
  const data = await fetch("http://localhost:3000/api/files", {
    method: "GET",
    credentials: "include",
  });
  const list: Promise<FileList> = data.json();

  return list;
}
