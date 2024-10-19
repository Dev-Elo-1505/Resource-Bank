import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Prop {
  params: { id: string };
}

const ResourceDetailPage = async ({ params }: Prop) => {
  const resource = await prisma.resource.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!resource) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow px-20 py-5">
        <h1 className="flex gap-4 font-bold text-2xl text-primary">{resource.title} <a className="text-black" href={resource.url} target="_blank"><FaExternalLinkAlt /></a></h1>
        <hr />
        <div className="mt-2 space-x-6">
          <span className="bg-bgBadge text-sm text-textBadge rounded-full px-2 py-1 text-center">
            {resource.category}
          </span>
          <span>{resource.createdAt.toDateString()}</span>
        </div>
        <p className="text-justify mt-5">{resource.description}</p>
      </section>
      <Footer />
    </div>
  );
};

export default ResourceDetailPage;
