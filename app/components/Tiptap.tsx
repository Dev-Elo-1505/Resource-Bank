"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { GrUnorderedList } from "react-icons/gr";
import { LuListOrdered } from "react-icons/lu";
import { TbBlockquote } from "react-icons/tb";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addResourceSchema } from "../validationSchema";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Resource } from "@prisma/client";

const CategoryEnum = z.enum(["BLOG", "VIDEO", "LINK", "OTHER"]);

type ResourceForm = z.infer<typeof addResourceSchema>;

const Tiptap = ({ resource }: { resource?: Resource }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResourceForm>({ resolver: zodResolver(addResourceSchema) });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: ResourceForm) => {
    setLoading(true);
    try {
      console.log(data);
      if (resource) await axios.put("/api/resource/" + resource.id, data);
      else await axios.post("/api/resource", data);
      console.log("Data sent successfully");
      router.push("/");
    } catch (error) {
      setError("An unexpected error has occured.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: resource?.description || "",
  });

  if (!editor) return null;
  return (
    <div>
      <form onSubmit={onSubmit} className="mx-auto p-4 max-w-3xl">
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="title">
            Title
          </label>
          <input
            {...register("title")}
            defaultValue={resource?.title}
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary placeholder-gray-500"
            id="title"
            name="title"
            placeholder="Enter a title..."
            required
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="category">
            Category
          </label>
          <select
            {...register("category")}
            defaultValue={resource?.category}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary appearance-none"
            id="category"
            name="category"
          >
            <option value="" disabled selected>
              Select a Category:{" "}
            </option>
            {CategoryEnum.options.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-bold text-lg mb-2" htmlFor="url">
            Url
          </label>
          <input
            {...register("url")}
            defaultValue={resource?.url}
            type="url"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary placeholder-gray-500"
            id="url"
            name="url"
            placeholder="Enter a valid url.."
            required
          />
          {errors.url && <p className="text-red-500">{errors.url.message}</p>}
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
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <FaUnderline />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <FaStrikethrough />
            </button>
            <button
              title="Heading 1"
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <FaHeading />
            </button>
            <button
              title="Heading 2"
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <FaHeading />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <LuListOrdered />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <GrUnorderedList />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${
                editor.isActive("bold") ? "bg-primary text-white" : ""
              } border border-gray-300 rounded-lg p-2`}
            >
              <TbBlockquote />
            </button>
          </div>
          <div>
            <Controller
              name="description"
              control={control}
              defaultValue={editor.getText()}
              render={({ field }) => (
                <EditorContent
                  editor={editor}
                  className="prose border p-4 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary min-h-52"
                  onBlur={() => field.onChange(editor.getText())}
                />
              )}
            />
          </div>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 m-2"
          >
            {resource ? "Update Resource" : "Add Resource"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tiptap;
// function useForm<T>(arg0: { resolver: any }): {
//   register: any;
//   handleSubmit: any;
//   formState: { errors: any };
// } {
//   throw new Error("Function not implemented.");
// }

// function zodResolver(
//   addResourceSchema: z.ZodObject<
//     {
//       title: z.ZodString;
//       description: z.ZodString;
//       url: z.ZodString;
//       category: z.ZodEnum<["BLOG", "VIDEO", "LINK", "OTHER"]>;
//     },
//     "strip",
//     z.ZodTypeAny,
//     {
//       title: string;
//       description: string;
//       url: string;
//       category: "BLOG" | "VIDEO" | "LINK" | "OTHER";
//     },
//     {
//       title: string;
//       description: string;
//       url: string;
//       category: "BLOG" | "VIDEO" | "LINK" | "OTHER";
//     }
//   >
// ): any {
//   throw new Error("Function not implemented.");
// }
