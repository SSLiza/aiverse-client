'use server'
import { serverFetch } from "@/lib/server-fetch";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const createPrompt = async (newPromptData) => {
    console.log("createPrompt action started. baseURL is:", baseURL);
    try {
        const res = await serverFetch(`${baseURL}/prompts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPromptData),
        });
        if (!res.ok) {
            const errText = await res.text().catch(() => "No body");
            console.error(`fetch to backend failed. Status: ${res.status}, Body: ${errText}`);
            throw new Error(`Failed to create prompt: Backend responded with ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error inside createPrompt action:", error);
        throw error;
    }
}