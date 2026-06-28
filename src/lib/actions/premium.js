'use server'
import { serverFetch } from "@/lib/server-fetch";

export const createPremium = async (premiumInfo) => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const res = await serverFetch(`${baseURL}/premiums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(premiumInfo),
        });
        if (!res.ok) {
            const errText = await res.text().catch(() => "No body");
            console.error(`fetch to backend failed. Status: ${res.status}, Body: ${errText}`);
            throw new Error(`Failed to create premium: Backend responded with ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error inside createPremium action:", error);
        throw error;
    }
}