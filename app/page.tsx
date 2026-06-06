import Hero from "./components/Hero";
import BigIdea from "./components/BigIdea";
import AnnotatedStatement from "./components/AnnotatedStatement";
import Ratios from "./components/Ratios";
import FloatSection from "./components/FloatSection";
import Simulator from "./components/Simulator";
import CheatSheet from "./components/CheatSheet";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <BigIdea />
      <AnnotatedStatement />
      <Ratios />
      <FloatSection />
      <Simulator />
      <CheatSheet />
      <Footer />
    </main>
  );
}
