import { SERVER_URL } from "../../../config";

const API_BASE_URL = "https://api.videosdk.live";

// Tokens are signed by kawan-server (GET /videosdk-token) so they never go stale
// in the client bundle. VITE_VIDEOSDK_TOKEN is an optional fallback for local dev.
export const getToken = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/videosdk-token`);
    if (res.ok) {
      const { token } = await res.json();
      if (token) return token;
    }
  } catch (error) {
    console.error("Failed to fetch VideoSDK token from server", error);
  }

  if (import.meta.env.VITE_VIDEOSDK_TOKEN) {
    return import.meta.env.VITE_VIDEOSDK_TOKEN;
  }
  throw new Error("Could not get a meeting token. Is kawan-server running?");
};

export const createMeeting = async ({ token }) => {
  const res = await fetch(`${API_BASE_URL}/v2/rooms`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.roomId) {
    throw new Error(data.error || "Failed to create meeting");
  }
  return data.roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const res = await fetch(`${API_BASE_URL}/v2/rooms/validate/${roomId}`, {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));

  if (res.status === 401 || data.code === 4002) {
    throw new Error(data.error || "Meeting token is invalid or expired");
  }
  return res.ok && data.roomId === roomId;
};
