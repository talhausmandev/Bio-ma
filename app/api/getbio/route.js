import connectDB from "@/lib/connectDB";
import Bio from "@/models/Bio";

export async function POST(req) {
  await connectDB();
  const { shortName, password } = await req.json();

  const bio = await Bio.findOne({ shortName });

  if (!bio) {
    return Response.json({ success: false, message: "Bio not found" });
  }

  if (bio.password !== password) {
    return Response.json({ success: false, message: "Incorrect password" });
  }

  return Response.json({ success: true, bio });
}
