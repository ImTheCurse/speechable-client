import { server } from "./bucket";
export type base64 = string;

export interface AudioData {
  data: base64;
}

export async function fetchCurrentAudio(content: string): Promise<base64> {
  const data: AudioData = await fetch(`${server}/api/speech`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify({ input: content }),
  }).then((res) => res.json());
  return data.data;
}
