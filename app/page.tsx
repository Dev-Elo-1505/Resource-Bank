import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CiSearch } from "react-icons/ci";
import prisma from "@/prisma/client";

export default async function Home() {
  const resources = await prisma.resource.findMany();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-20 py-5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-0 focus:ring-primary focus:border-primary placeholder-gray-500">
            <CiSearch />
            <input
              type="text"
              placeholder="Search for resource..."
              className="w-full border-0 outline-none"
            />
          </div>
          <div>
            <button
              aria-label="Search Resources"
              className="bg-primary text-white rounded w-20 py-2 px-5 text-center"
            >
              Search
            </button>
          </div>
        </div>
        <section className="flex justify-between items-center mt-10 mb-4 flex-wrap">
          {resources.map((resource) => (
            <Link href={`/resource/${resource.id}`} key={resource.id}>
              <article className="flex flex-col shadow-md rounded-lg w-72 h-80 mb-6 hover:scale-105 transition-transform hover:shadow-2xl">
                <div className="bg-primary p-3 rounded-t-lg">
                  <h1 className="text-center font-bold text-2xl text-white">
                    {resource.title}
                  </h1>
                </div>
                <div className="p-3 flex-grow">
                  <p>
                    {resource.description.split(" ").length > 30
                      ? `${resource.description
                          .split(" ")
                          .slice(0, 30)
                          .join(" ")}...`
                      : resource.description.split(" ").slice(0, 30).join(" ")}
                  </p>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <p className="bg-bgBadge text-sm text-textBadge rounded-full px-2 text-center">
                    {resource.category}
                  </p>
                  <p>{resource.createdAt.toDateString()}</p>
                </div>
              </article>
            </Link>
          ))}
        </section>
        <button className="bg-primary text-white rounded p-2 m-2">
          <Link href="/resource">New Resource</Link>
        </button>
      </main>
      <Footer />
    </div>
  );
}

export const dynamic = 'force-dynamic'