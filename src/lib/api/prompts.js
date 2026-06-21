const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }
  return res.json();
};

export const getMyPrompts = async (creatorId) => {
  try {
    const res = await fetch(
      `${baseURL}/prompts?creatorId=${creatorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    return await handleResponse(res);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    throw error;
  }
};

export const deletePrompt = async (id) => {
  try {
    const res = await fetch(`${baseURL}/prompts/${id}`, {
      method: "DELETE",
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error deleting prompt:", error);
    throw error;
  }
};

export const updatePrompt = async (id, data) => {
  const { _id, ...promptData } = data || {};

  try {
    const res = await fetch(`${baseURL}/prompts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    });

    return await handleResponse(res);
  } catch (error) {
    console.error("Error updating prompt:", error);
    throw error;
  }
};