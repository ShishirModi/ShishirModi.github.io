import { Navbar } from "@/app/components/navbar";
import { CustomCursor } from "@/app/components/custom-cursor";
import { SmoothScroll } from "@/app/components/smooth-scroll";
import { Hero } from "@/app/sections/hero";
import { About } from "@/app/sections/about";
import { Projects } from "@/app/sections/projects";
import { Contact } from "@/app/sections/contact";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
