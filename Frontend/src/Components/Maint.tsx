// import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Maint = () => {
  return (
    <section className="flex flex-col items-center text-center px-4 py-20 space-y-6">
      <motion.section
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-10"
      ></motion.section>
      <motion.h1
        className="bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-5xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 0.2 }}
      >
        Predict the Future of Crypto with{" "}
        <span className="bg-gradient-to-br from-[#50d997] to-[#50d997] bg-clip-text text-5xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]">
          CryptoCast
        </span>
      </motion.h1>
      <motion.p
        className="mt-6 text-lg font-medium text-zinc-400 md:text-xl"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.6 }}
      >
        Real-time machine learning predictions for top cryptocurrencies. Stay
        ahead of the market, powered by data, not hype.
      </motion.p>
      <div className="space-x-4">
        <Link to="/Main">
          <Button text="Go to App" />
        </Link>
      </div>
      <div>
        <a className="flex flex-col items-center gap-1">
          <motion.p
            className="text-sm/6 text-zinc-400 duration-300 group-hover:text-zinc-100"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.4, ease: "easeIn", delay: 1 }}
          >
            Learn more
          </motion.p>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-down text-zinc-400 duration-300 group-hover:translate-y-1.5 group-hover:text-zinc-10"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.8, ease: "easeIn", delay: 1.2 }}
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </motion.svg>
        </a>
      </div>
    </section>
  );
};

export default Maint;
// bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-5xl/[1.07] font-bold tracking-tight text-transparent md:text-7xl/[1.07]
