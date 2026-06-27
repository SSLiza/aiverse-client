import { cookies } from "next/headers";

export async function serverFetch(url, options = {}) {
  let token = null;
  try {
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  } catch (error) {
    // cookies() might fail if called outside request context, ignore
    console.warn("Failed to retrieve cookies in serverFetch:", error.message);
  }

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
