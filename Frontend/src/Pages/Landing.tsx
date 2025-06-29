import Navbar from "../Components/Navbar";
import Maint from "../Components/Maint";
import { motion } from "framer-motion";
import ParticleBackground from "../Components/particleBakground";
import { ChartAreaInteractive } from "@/Components/Chart";

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
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <ParticleBackground />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-0 bg-[image:radial-gradient(70%_80%_at_50%_-25%,#2b7855,rgba(155,155,155,0))]"
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="relative z-30">
            <Navbar />
            <Maint />
            <motion.div
              className="w-full max-w-5xl mx-auto px-4 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              <ChartAreaInteractive />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
