import connectDB from "@/lib/connectDB";
import Bio from "@/models/Bio";

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const shortName = formData.get("shortName");
  const password = formData.get("password");
  const description = formData.get("description");
  const links = JSON.parse(formData.get("links"));
  const imageFile = formData.get("image");

  // Check if shortName already exists
  const existingBio = await Bio.findOne({ shortName });
  if (existingBio) {
    return Response.json({ success: false, message: "Short name already exists" });
  }

  let image = "";
  if (imageFile) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
  }

  const newBio = await Bio.create({
    shortName,
    password,
    description,
    links,
    image,
  });

  return Response.json({ success: true, bio: newBio });
}

