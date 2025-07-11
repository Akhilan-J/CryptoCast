import React, { useState, useMemo } from "react";

import logo from "/src/assets/CryptoCast_logo.png";
import MoonLoader from "react-spinners/MoonLoader";
import ParticleBackground from "../Components/particleBakground";
import Verify from "@/Components/Verify";
import Ucard from "@/Components/Ucard";
import Pcard from "@/Components/Pcard";

const MainPage: React.FC = () => {
  const now = "14:25:23";

  const [ethData, setEthData] = useState<any>(null);
  const [btcData, setBtcData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [btcVerified, setBtcVerified] = useState<any>(null);
  const [ethVerified, setEthVerified] = useState<any>(null);

  const getBtcVerified = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify/btc", {
        method: "GET",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("error =", err);
      throw err;
    }
  };
  const getEthVerified = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify/eth", {
        method: "GET",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("error =", err);
      throw err;
    }
  };

  const getEthPrice = async () => {
    try {
      const res = await fetch("http://localhost:5000/eth", {
        method: "GET",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("error =", err);
      throw err;
    }
  };

  const getBtcPrice = async () => {
    try {
      const res = await fetch("http://localhost:5000/btc", {
        method: "GET",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("error =", err);
      throw err;
    }
  };
  const fetchData = async () => {
    try {
      const [eth, btc, ethVerified1, btcVerified1] = await Promise.all([
        getEthPrice(),
        getBtcPrice(),
        getEthVerified(),
        getBtcVerified(),
      ]);
      console.log("eth", eth);
      console.log("btc", btc);
      console.log("ethVerified1", ethVerified1);
      console.log("btcVerified1", btcVerified1);
      setEthData(eth);
      setBtcData(btc);
      setEthVerified(ethVerified1);
      setBtcVerified(btcVerified1);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  useMemo(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      console.log("");
    }, 600000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 relative">
      <ParticleBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <img src={logo} alt="CryptoCast logo" className="h-16" />
          <h1 className=" bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent text-3xl font-bold text-center">
            Welcome To CryptoCast
          </h1>
        </div>
        <section className="mb-12">
          <h2 className=" bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent text-2xl font-semibold mb-4">
            Ethereum Prediction
          </h2>
          <div className="flex flex-wrap gap-4">
            {loading ? (
              <MoonLoader
                color="#ffffff"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : error ? (
              <p className="text-red-400">Error loading data: {error}</p>
            ) : ethData && ethData.currentPrice ? (
              <>
                <Ucard
                  title="Current Price"
                  value={`${ethData.currentPrice}`}
                  valueColor="#6ee7b7"
                  subtextColor="#4ade80"
                  Time={ethData.timestamp || now}
                  subtext=""
                />
                <Pcard
                  title="Prediction"
                  value={`${ethData.predictedPrice}`}
                  valueColor="#60a5fa"
                  subtext={`${ethData.priceChange} `}
                  subtextColor={
                    ethData.trend === "Bullish" ? "#4ade80" : "#f87171"
                  }
                  trend={ethData.trend}
                />
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent text-2xl font-semibold mb-4">
            Bitcoin Prediction
          </h2>
          <div className="flex flex-wrap gap-4">
            {loading ? (
              <MoonLoader
                color="#ffffff"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : error ? (
              <p className="text-red-400">Error loading data: {error}</p>
            ) : btcData && btcData.currentPrice ? (
              <>
                <Ucard
                  title="Current Price"
                  value={`${btcData.currentPrice}`}
                  valueColor="#6ee7b7"
                  subtextColor="#4ade80"
                  subtext=""
                  Time={btcData.timestamp || now}
                />
                <Pcard
                  title="Prediction"
                  value={`${btcData.predictedPrice}`}
                  valueColor="#60a5fa"
                  subtext={`${btcData.priceChange} `}
                  subtextColor={
                    btcData.trend === "Bullish" ? "#4ade80" : "#f87171"
                  }
                  trend={btcData.trend}
                />
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
          <h2 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent text-3xl font-bold mb-4 mt-8">
            What Could have been
          </h2>
          <div className="flex flex-wrap gap-4">
            <Verify Crypto="Bitcoin" Correct={btcVerified?.Result} />
          </div>
          <div className="flex flex-wrap gap-4 mb-4 mt-8">
            <Verify Crypto="Ethereum" Correct={ethVerified?.Result} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
