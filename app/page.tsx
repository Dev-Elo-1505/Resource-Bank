import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-20">
        <button className="bg-primary text-white rounded p-2 m-2">
          <Link href="/resource">New Resource</Link>
        </button>
      </main>
      <Footer />
    </div>
  );
}
