import connectDB from "@/lib/connectDB";
import Bio from "@/models/Bio";

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();
    const shortName = formData.get("shortName");
    const password = formData.get("password");
    const description = formData.get("description");
    const links = JSON.parse(formData.get("links"));
    const imageFile = formData.get("image");

    const existing = await Bio.findOne({ shortName });

    if (!existing) {
      return Response.json({ success: false, message: "Bio not found" }, { status: 404 });
    }

    if (existing.password !== password) {
      return Response.json({ success: false, message: "Wrong password" }, { status: 401 });
    }

    // convert image to base64 if new image uploaded
    let image = existing.image;
    if (imageFile && typeof imageFile === "object") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
    }

    existing.description = description;
    existing.links = links;
    existing.image = image;

    await existing.save();

    return Response.json({ success: true, bio: existing });
  } catch (err) {
    console.error("Update Error:", err);
    return Response.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}
