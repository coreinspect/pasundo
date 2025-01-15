import About from "@/components/About/About";
import Header from "@/components/Header/Header";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
// import WhyPasundo from "@/components/WhyChoosePasundo/WhyPasundo";

export default function Home() {
  return (
    <section>
      <Header />
      <HowItWorks />
      <About />
      {/* <WhyPasundo /> */}
    </section>
  );
}
