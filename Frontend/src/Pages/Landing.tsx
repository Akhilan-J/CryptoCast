import Navbar from "../Components/Navbar";
import Maint from "../Components/Maint";
import { motion } from "framer-motion";
import ParticleBackground from "../Components/particleBakground";
import { ChartAreaInteractive } from "@/Components/Chart";
import { Link } from "react-router";
import Footer from "../Components/Footer";

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
            className="absolute inset-0 z-0 bg-[image:radial-gradient(80%_68%_at_50%_-25%,#2b7855,rgba(155,155,155,0))]"
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="relative z-30">
            <Navbar />
            <Maint />
            <motion.div
              className="w-full max-w-5xl mx-auto px- py- transform -translate-y-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              <ChartAreaInteractive />
            </motion.div>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-7xl p-6 py-16 md:py-24 lg:px-8">
        <div className="grid  justify-between gap-5 md:grid-cols-1 md:gap-8 lg:grid-cols-2">
          <div className="justify-start pr-8 text-4xl/[1.07] font-bold tracking-tight md:pr-16 md:text-5xl/[1.07] mt-10">
            <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
              Who said crypto forecasting has to be a guessing game?
            </span>
          </div>
          <div className="text-lg text-zinc-400/80 mt-10">
            With CryptoCast, predicting crypto prices becomes clear, confident,
            and kind of addictive. Our intelligent platform cuts through the
            noise, delivering real-time forecasts powered by deep learning no
            spreadsheets, no second-guessing.{" "}
            <span className="text-zinc-200">
              {" "}
              Say goodbye to hype and hello to high accuracy signals.
            </span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl p-6 py-16 md:py-24 lg:px-8">
        <div className="grid  justify-between gap-5 md:grid-cols-1 md:gap-8 lg:grid-cols-2">
          <div className="text-lg text-zinc-400/80 mt-10">
            Tired of chasing charts? CryptoCast keeps you ahead with updates
            every 4 hours , clean visuals, and a system that learns as fast as
            the market moves.{" "}
            <span className="text-zinc-200">
              {" "}
              You watch the trends we crunch the numbers.
            </span>
          </div>
          <div className="justify-start pr-8 text-4xl/[1.07] font-bold tracking-tight md:pr-16 md:text-5xl/[1.07] mt-10">
            <span className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
              Stop refreshing. Start predicting.
            </span>
          </div>
        </div>
      </section>

      <section className="relative mx-auto mt-16 max-w-full p-6 pb-12 pt-20 lg:px-8">
        <div
          aria-hidden="true"
          className="user-select-none center pointer-events-none absolute -top-0.5 left-1/2 h-px w-4/5 max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform-gpu [background:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(43,120,85,0.65)_50%,rgba(0,0,0,0)_100%)]"
        ></div>
        <div className="relative isolate">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(40%_80%_at_center,black,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="cta"
                width="80"
                height="80"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none"></path>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#cta)"
            ></rect>
          </svg>
          <div
            className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-green-500 to-emerald-800 opacity-20"
              style={{
                clipPath:
                  "polygon(77.5% 40.13%, 90% 10%, 80% 50%, 95% 80%, 92% 85%, 75% 65%, 61.26% 54.7%, 50% 54.7%, 47.24% 65.81%, 50% 85%, 26.16% 73.91%, 0.1% 100%, 1% 40.13%, 20% 48.75%, 60% 0.25%, 67.5% 32.63%)",
              }}
            ></div>
          </div>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="bg-gradient-to-br from-zinc-100 to-zinc-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              See where ML-powered crypto forecasting can take your portfolio.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400/80">
              The first crypto prediction tool you'll trust. And the last one
              you'll ever need.
            </p>
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
        <div className="mt-16 ">
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

export default Landing;
