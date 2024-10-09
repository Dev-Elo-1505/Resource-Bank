import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="text-green-900 underline">Hello Resource</div>
      <Footer />
    </div>
  );
}
