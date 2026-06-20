'use server';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyPrompts = async (creatorId) => {
    try {
        const res = await fetch(`${baseURL}/prompts?creatorId=${creatorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch prompts");
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching prompts:", error);
        throw error;
    }
}
// export const getAllPrompts = async () => {
//     try {
//         const res = await fetch(`${baseURL}/prompts`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         if (!res.ok) {
//             throw new Error("Failed to fetch prompts");
//         }
//         return res.json();
//     } catch (error) {
//         console.error("Error fetching prompts:", error);
//         throw error;
//     }
// }               