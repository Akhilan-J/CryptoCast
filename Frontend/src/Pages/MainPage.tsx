import React, { useState, useMemo } from "react";

import logo from "/src/assets/CryptoCast_logo.png";
import MoonLoader from "react-spinners/MoonLoader";
import ParticleBackground from "../Components/particleBakground";
import Verify from "@/Components/Verify";
import Ucard from "@/Components/Ucard";
import Pcard from "@/Components/Pcard";
import { Link } from "react-router";
import Indicator from "@/Components/Indicator";

const MainPage: React.FC = () => {
  const [ethData, setEthData] = useState<any>(null);
  const [btcData, setBtcData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [btcVerified, setBtcVerified] = useState<any>(null);
  const [ethVerified, setEthVerified] = useState<any>(null);
  const [ethError, setEthError] = useState<any>(null);
  const [btcError, setBtcError] = useState<any>(null);

  const convertToLocalTime = (utcTimestamp: string) => {
    const date = new Date(utcTimestamp);
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getBtcVerified = async () => {
    try {
      const res = await fetch("https://api.cryptocast.live/verify/btc", {
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
      const res = await fetch("https://api.cryptocast.live/verify/eth", {
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
      const res = await fetch("https://api.cryptocast.live/eth", {
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
      const res = await fetch("https://api.cryptocast.live/btc", {
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

  const getEthError = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/volatility/eth", {
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
  const getBtcError = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/volatility/btc", {
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
      const [eth, btc, ethVerified1, btcVerified1, ethError, btcError] =
        await Promise.all([
          getEthPrice(),
          getBtcPrice(),
          getEthVerified(),
          getBtcVerified(),
          getEthError(),
          getBtcError(),
        ]);

      // Check for different possible timestamp property names
      if (eth && (eth.timestamp || eth.timestamp_display)) {
        const timestampToConvert = eth.timestamp || eth.timestamp_display;
        eth.timestamp_display = convertToLocalTime(timestampToConvert);
      }

      if (btc && (btc.timestamp || btc.timestamp_display)) {
        const timestampToConvert = btc.timestamp || btc.timestamp_display;
        btc.timestamp_display = convertToLocalTime(timestampToConvert);
      }
      setEthData(eth);
      setBtcData(btc);
      setEthVerified(ethVerified1);
      setBtcVerified(btcVerified1);
      setEthError(ethError);
      setBtcError(btcError);
      console.log("btcVerified", btcVerified1);
      console.log("ethVerified", ethVerified1);
      console.log("ethError", ethError);
      console.log("btcError", btcError);
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
          <Link to="/">
            <img src={logo} alt="CryptoCast logo" className="h-16" />
          </Link>
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
                  Time={ethData.timestamp_display}
                  subtext=""
                />
                <Pcard
                  errorP={ethError.average_error}
                  title="Prediction "
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
                  Time={btcData.timestamp_display}
                />
                <Pcard
                  errorP={btcError.average_error}
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
        </section>
        <section className="flex flex-col">
          <h2 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent text-3xl font-bold mb-4 mt-8">
            Prediction Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2  mb-4">
            {loading ? (
              <div className="col-span-2 flex justify-center">
                <MoonLoader
                  color="#ffffff"
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : error ? (
              <div className="col-span-2 flex justify-center">
                <p className="text-red-400">Error loading data: {error}</p>
              </div>
            ) : btcVerified && ethVerified ? (
              <>
                <Verify
                  crypto="Bitcoin"
                  predictionDate={btcVerified?.predictionDate.slice(0, -22)}
                  predictionTime={btcData?.timestamp_display}
                  predictionPrice={btcVerified?.predictedPrice}
                  actualPrice={btcVerified?.actualPrice}
                  errorPercent={btcVerified?.errorPercent}
                  directionCorrect={btcVerified?.directionCorrect}
                />
                <Verify
                  crypto="Ethereum"
                  predictionDate={ethVerified?.predictionDate.slice(0, -17)}
                  predictionTime={ethData?.timestamp_display}
                  predictionPrice={ethVerified?.predictedPrice}
                  actualPrice={ethVerified?.actualPrice}
                  errorPercent={ethVerified?.errorPercent}
                  directionCorrect={ethVerified?.directionCorrect}
                />
              </>
            ) : (
              <div className="col-span-2 flex justify-center">
                <p>No verification data available</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
