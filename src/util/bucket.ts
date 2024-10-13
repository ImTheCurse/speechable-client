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
export async function uploadFile(file: File | null) {
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append("upload", file);
  await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
}
