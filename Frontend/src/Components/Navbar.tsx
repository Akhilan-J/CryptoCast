// import React from "react";

import Crypto_img from "/CryptoCast_logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router";

function navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 md:px-8">
      <Link to="/">
        <div className="flex items-center gap-2 ml-40">
          <motion.section
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-10"
          ></motion.section>
          <motion.img
            src={Crypto_img}
            alt="logo"
            className="h-10 w-auto"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.8, ease: "easeIn", delay: 0 }}
          />
          <motion.h1
            className="text-xl font-bold"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.8, ease: "easeIn", delay: 0 }}
          >
            CryptoCast
          </motion.h1>
        </div>
      </Link>
      <div className="mr-40">
        <motion.section
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-10"
        ></motion.section>
        <Link to="/Main">
          <motion.button
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.8, ease: "easeIn", delay: 0 }}
            className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
            type="button"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(34,197,94,0.6)_0%,rgba(34,197,94,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <Link to="/Main">
              <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
                Go to App
              </div>
            </Link>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-green-400/0 via-green-400/90 to-green-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}

export default navbar;
