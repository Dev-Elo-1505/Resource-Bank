import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <button className="bg-primary text-white rounded p-2 m-2"><Link href="/resource">New Resource</Link></button>
      <Footer />
    </div>
  );
}
