// import React from "react";
import { motion } from "framer-motion";

type prop = { text: string };

function Button({ text }: prop) {
  return (
    <div>
      <motion.section
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-10"
      ></motion.section>
      <button
        className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow m-5"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:Rjlj9ukq:"
        data-state="closed"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,[#50d997]0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
          {text}
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-[#50d997]/0 via-[#50d997]/90 to-[#50d997]/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
    </div>
  );
}

export default Button;
