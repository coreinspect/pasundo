import About from "@/components/About/About";
import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import WhyPasundo from "@/components/WhyChoosePasundo/WhyPasundo";

export default function Home() {
  return (
    <section>
      <Header />
      <About />
      <HowItWorks />
      <WhyPasundo />
      <Footer />
    </section>
  );
}
