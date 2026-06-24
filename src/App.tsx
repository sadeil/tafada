import { useEffect } from "react";
import Background from "./components/Background";
import Hero from "./components/Hero";
import BookOrbit from "./components/BookOrbit";
import MiniTest from "./components/MiniTest";
import FinalCTA from "./components/FinalCTA";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-white bg-noise vignette">
      <Background />
      <NavBar />
      <main className="relative z-10">
        <Hero />
        <BookOrbit />
        <MiniTest />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
