/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BioPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [shortName, setShortName] = useState("");
  const [password, setPassword] = useState("");
  const [links, setLinks] = useState([""]);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const addLink = () => setLinks([...links, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("shortName", shortName);
    formData.append("password", password);
    formData.append("description", description);
    formData.append("links", JSON.stringify(links));

    const res = await fetch("/api/savebio", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success === false) {
      toast.error(data.message || "Bio creation failed");
    } else {
      toast.success("Bio created!");
      toast.info(`Your link is: ${process.env.NEXT_PUBLIC_HOST}/bio/${shortName}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Your Bio</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Image Upload */}
        <div>
          <label className="font-semibold block mb-1">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-3 rounded-full"
            />
          )}
        </div>

        {/* Short Name */}
        <div>
          <label className="font-semibold block mb-1">Bio Shortener</label>
          <input
            type="text"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. talha123"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold block mb-1">Bio Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Links */}
        <div>
          <label className="font-semibold block mb-1">Bio Links</label>
          {links.map((link, index) => (
            <input
              key={index}
              type="url"
              placeholder={`Link ${index + 1}`}
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              required
            />
          ))}
          <button
            type="button"
            onClick={addLink}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add More Links
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold block mb-1">Bio Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Tell something about yourself..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-lime-600 text-white font-semibold py-2 rounded hover:bg-lime-700"
        >
          Submit Bio
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
