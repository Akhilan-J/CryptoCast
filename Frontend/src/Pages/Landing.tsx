import Navbar from "../Components/Navbar";
import Maint from "../Components/Maint";
import { motion } from "framer-motion";
import ParticleBackground from "../Components/particleBakground";

function Landing() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <motion.section
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-10"
      ></motion.section>
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
          <motion.div
            className="absolute inset-0  bg-[image:radial-gradient(70%_80%_at_50%_-25%,#2b7855,rgba(155,155,155,0))]"
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <Navbar />
            <ParticleBackground />
            <Maint />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
