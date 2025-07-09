import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ParticleBackground from "../Components/particleBakground";
import Ucard from "@/Components/Ucard";
function Terms() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className=" bg-zinc-950 text-white">
        <div className=" bg-black text-white overflow-hidden">
          <div className="relative z-30">
            <Navbar />
            <motion.div
              className="mx-auto max-w-4xl px-6 py-16 md:py-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="text-center ">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                    Terms of Service
                  </span>
                </h1>
                <p className="mt-6 text-lg text-zinc-400/80 max-w-2xl mx-auto">
                  The rules and guidelines for using CryptoCast's forecasting
                  platform.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-4xl -mt-7 lg:px-8">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Acceptance of Terms
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                By accessing and using CryptoCast, you accept and agree to be
                bound by the terms and provision of this agreement.
                <span className="text-zinc-200">
                  {" "}
                  If you do not agree to abide by these terms, please do not use
                  this service.
                </span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Service Description
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                CryptoCast provides cryptocurrency price forecasting using
                machine learning algorithms. Our service includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Real-time cryptocurrency price predictions</li>
                <li>Historical accuracy tracking</li>
                <li>Updates every 4 hours</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Investment Disclaimer
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                <span className="text-zinc-200 font-semibold">Important:</span>{" "}
                CryptoCast predictions are for informational purposes only and
                should not be considered as financial advice. Cryptocurrency
                investments carry high risk, and past performance does not
                guarantee future results.
              </p>
              <p>
                <span className="text-zinc-200">
                  Always conduct your own research and consult with financial
                  advisors before making investment decisions.
                </span>
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                User Responsibilities
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>As a user of CryptoCast, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the service responsibly and legally</li>
                <li>Not attempt to manipulate or interfere with our systems</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                Limitation of Liability
              </span>
            </h2>
            <div className="text-lg text-zinc-400/80 space-y-4">
              <p>
                CryptoCast shall not be liable for any direct, indirect,
                incidental, or consequential damages resulting from the use of
                our service.
                <span className="text-zinc-200">
                  {" "}
                  We provide predictions based on historical data and machine
                  learning models, but cannot guarantee accuracy.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto mt-16 max-w-full p-6 pb-12 pt-20 lg:px-8">
        <div
          aria-hidden="true"
          className="user-select-none center pointer-events-none absolute -top-0.5 left-1/2 h-px w-4/5 max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform-gpu [background:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(43,120,85,0.65)_50%,rgba(0,0,0,0)_100%)]"
        ></div>
        <div className="relative isolate">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="bg-gradient-to-br from-zinc-100 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Ready to experience intelligent crypto forecasting?
            </h2>
            <div className="mt-12 flex items-center justify-center relative z-50">
              <button
                className="group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
                type="button"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(34,197,94,0.6)_0%,rgba(34,197,94,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative z-10 rounded-full bg-zinc-950 px-4 py-1.5 ring-1 ring-white/10">
                  Start Forecasting
                </div>
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

export default Terms;
