import { env } from "./config/env";

export async function post(url: string, body: object) {
  url = env.BACK_END_SERVER + url;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await res.json();
    console.log("post result:", { url, body, json });
    return json;
  } catch (error) {
    console.log("failed to post:", { url, body, error });
    return { error: String(error) };
  }
}
