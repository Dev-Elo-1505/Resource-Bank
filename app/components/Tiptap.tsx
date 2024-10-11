"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import { FaBold, FaItalic } from "react-icons/fa";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  if (!editor) return null;
  return (
    <div>
      <form className="mx-auto p-4 max-w-3xl">
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3"
            id="title"
            name="title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3"
            id="category"
            name="category"
          >
            <option value="" disabled selected>
              Select a Category:{" "}
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="url">
            Url
          </label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded-lg p-3"
            id="url"
            name="url"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="description">
            Description
          </label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <FaItalic />
            </button>
          </div>
          <EditorContent editor={editor} className="border p-4 rounded-lg" />
        </div>
        <div>
          <button className="bg-primary text-white rounded p-2 m-2">
            <Link href="/">New Resource</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tiptap;
