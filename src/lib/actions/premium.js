'use server'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const createPremium = async (premiumInfo) => {
    // console.log("createPrompt action started. baseURL is:", baseURL);
    try {
        const res = await fetch(`${baseURL}/premiums`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(premiumInfo),
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