import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Tiptap from "@/app/components/Tiptap";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Prop {
  params: { id: string };
}

const EditResourcePage = async ({ params }: Prop) => {
    const resource = await prisma.resource.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!resource) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow px-20 mt-5">
        <Tiptap resource={resource} />
      </section>
      <Footer />
    </div>
  );
};

export default EditResourcePage;
