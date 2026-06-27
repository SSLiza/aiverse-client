export async function getStats() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stats`,
        {
            cache: "no-store",
        }
    );

    return res.json();
}