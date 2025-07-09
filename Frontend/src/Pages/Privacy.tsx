import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ParticleBackground from "../Components/particleBakground";
import { Link } from "react-router";

function Privacy() {
  return (
    <div className="relative  bg-black text-white overflow-hidden">
      <div className="bg-zinc-950 text-white">
        <div className="  bg-black text-white overflow-hidden">
          <div className="relative z-30">
            <Navbar />
            <motion.div
              className="mx-auto max-w-4xl px-6 py-16 md:py-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                    Privacy Policy
                  </span>
                </h1>
                <p className=" text-lg text-zinc-400/80 max-w-2xl mx-auto mt-6">
                  Your privacy is our priority. Here's how CryptoCast ensures
                  complete privacy without collecting any data.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-4xl p-10 -mt-35  lg:px-8">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Information We Collect
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                CryptoCast operates without collecting personal information from
                our users. We believe in providing crypto forecasting services
                while respecting your privacy.
              </p>
              <p className="text-zinc-200">
                We do not collect, store, or process any personal data
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (no registration required)</li>
                <li>Usage data or personal preferences</li>
                <li>Device or browser information</li>
                <li>IP addresses or location data</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-3 mt-3"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                How Our Service Works
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                Our forecasting service operates entirely on publicly available
                market data and advanced algorithms:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Real-time cryptocurrency market data analysis</li>
                <li>
                  Machine learning models trained on historical price patterns
                </li>
                <li>No user data required for predictions</li>
                <li>Anonymous access to all forecasting features</li>
                <li>Complete privacy by design</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="space-y-3 mt-3"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Data Security
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                Since CryptoCast doesn't collect or store any personal
                information, there are no privacy concerns regarding data
                breaches or unauthorized access to your data.
                <span className="text-zinc-200">
                  {" "}
                  Your privacy is guaranteed by design - we simply don't have
                  any personal data to protect.
                </span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-3 mt-3"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80">
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at
                <span className="text-zinc-200">
                  {" "}
                  akhilanjeyaraj1@gmail.com
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative mx-auto mt-16 max-w-full p-6 pb-12 pt-20 lg:px-8">
        <div
          aria-hidden="true"
          className="user-select-none center pointer-events-none absolute -top-0.5 left-1/2 h-px w-4/5 max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform-gpu [background:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(43,120,85,0.65)_50%,rgba(0,0,0,0)_100%)]"
        ></div>
        <div className="relative isolate">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="bg-gradient-to-br from-zinc-100 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Ready to start forecasting with confidence?
            </h2>
            <div className="mt-12 flex items-center justify-center relative z-50">
              <button
                className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
                type="button"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(34,197,94,0.6)_0%,rgba(34,197,94,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <Link to="/Main">
                  <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
                    Start Forecasting
                  </div>
                </Link>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-green-400/0 via-green-400/90 to-green-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <Footer />
        </div>
      </section>

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <ParticleBackground />
        </div>
      </motion.div>
    </div>
  );
}

export default Privacy;
