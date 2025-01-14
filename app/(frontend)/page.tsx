import About from "@/components/About/About";
import Header from "@/components/Header/Header";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <section>
      <Header />
      <HowItWorks />
      <About />
    </section>
  );
}
