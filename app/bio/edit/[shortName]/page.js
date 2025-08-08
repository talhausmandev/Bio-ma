/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditBioPage() {
  const { shortName } = useParams();
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handlePasswordSubmit = async () => {
  const res = await fetch("/api/getbio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shortName, password }),
  });

  const data = await res.json();

  if (data.success) {
    setBio(data.bio);
    setImagePreview(data.bio.image);
    setError("");
  } else {
    setError(data.message || "Wrong password");
  }
};


  const handleLinkChange = (index, value) => {
    const newLinks = [...bio.links];
    newLinks[index] = value;
    setBio({ ...bio, links: newLinks });
  };

  const addLink = () => setBio({ ...bio, links: [...bio.links, ""] });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("shortName", shortName);
    formData.append("password", password);
    formData.append("description", bio.description);
    formData.append("links", JSON.stringify(bio.links));
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch("/api/updatebio", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError(data.message || "Update failed");
    }
  };

  if (submitted) return <div className="text-center mt-10">✅ Bio updated!</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Bio for {shortName}</h1>

      {!bio ? (
        <>
          <input
            type="password"
            placeholder="Enter bio password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 mb-2"
          />
          <button
            onClick={handlePasswordSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <label>Update Description:</label>
          <textarea
            value={bio.description}
            onChange={(e) => setBio({ ...bio, description: e.target.value })}
            rows={3}
            className="border px-3 py-2"
          />

          <label>Update Links:</label>
          {bio.links.map((link, index) => (
            <input
              key={index}
              type="text"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="border px-3 py-2"
            />
          ))}
          <button
            type="button"
            onClick={addLink}
            className="bg-gray-300 px-3 py-1 rounded w-fit"
          >
            ➕ Add Link
          </button>

          <label>Update Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} className="w-32 h-32 rounded-full mt-2 object-cover" />
          )}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
