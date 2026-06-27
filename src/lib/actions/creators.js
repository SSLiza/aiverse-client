export async function getTopCreators(page = 1, limit = 8) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/top-creators?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(`Failed to fetch top creators: backend status ${res.status}`);
      return { data: [], totalPages: 1, totalCount: 0, currentPage: 1 };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching top creators:", error);
    return { data: [], totalPages: 1, totalCount: 0, currentPage: 1 };
  }
}