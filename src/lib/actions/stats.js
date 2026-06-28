export async function getStats() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stats`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}

export async function getCreatorStats(email) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/creator/stats/${encodeURIComponent(email)}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch creator stats");
    }

    return res.json();
}