import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("your-db-name");
  }
  return db;
}

export async function GET(req) {
  try {
    const db = await connectDB();
    const collection = db.collection("prompts");

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const aiTool = searchParams.get("aiTool");
    const difficulty = searchParams.get("difficulty");
    const sort = searchParams.get("sort");

    // Build query
    let query = { visibility: "Public" };

    // SEARCH (title, tags, aiTool)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
        { aiTool: { $regex: search, $options: "i" } },
      ];
    }

    // FILTERS
    if (category) query.category = category;
    if (aiTool) query.aiTool = aiTool;
    if (difficulty) query.difficulty = difficulty;

    // SORTING
    let sortOption = { createdAt: -1 }; // Latest default

    if (sort === "mostCopied") sortOption = { copyCount: -1 };
    if (sort === "latest") sortOption = { createdAt: -1 };
    if (sort === "mostPopular") sortOption = { rating: -1 };

    const prompts = await collection
      .find(query)
      .sort(sortOption)
      .toArray();

    return Response.json({ success: true, data: prompts });
  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}