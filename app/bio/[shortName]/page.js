import connectDB from "@/lib/connectDB";
import Bio from "@/models/Bio";

export async function generateMetadata({ params }) {
  const { shortName } = await params ;
  return {
    title: `${shortName}'s Bio`,
  };
}

export default async function BioPage({ params }) {
  const { shortName } = await params;
  await connectDB();

  const bio = await Bio.findOne({ shortName }).lean();

  if (!bio) {
    return <div className="text-center mt-10 text-red-600">Bio not found</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow shadow-lime-500 rounded-4xl text-center">
      {bio.image && (
        <img
          src={bio.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{bio.shortName}</h1>
      <p className="mb-4 text-gray-700">{bio.description}</p>
      <div className="flex flex-col items-center gap-2">
        {bio.links.map((link, i) => (
          <a
            key={i}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
