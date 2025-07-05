import React, { useEffect, useState, useMemo } from "react";
import CurrCard from "../Components/CurrCard";
import PredictionCard from "../Components/PredictionCard";
import logo from "/src/assets/CryptoCast_logo.png";
import MoonLoader from "react-spinners/MoonLoader";

const MainPage: React.FC = () => {
  const now = "14:25:23";

  const [ethData, setEthData] = useState<any>(null);
  const [btcData, setBtcData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEthPrice = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/eth", {
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
      const res = await fetch("http://127.0.0.1:5000/btc", {
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
      const [eth, btc] = await Promise.all([getEthPrice(), getBtcPrice()]);
      setEthData(eth);
      setBtcData(btc);
      console.log("we are doing this ");
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
      console.log("hehehehah");
    }, 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto ">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <img src={logo} alt="CryptoCast logo" className="h-16" />
          <h1 className="text-3xl font-bold text-center">
            Welcome To CryptoCast
          </h1>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Ethereum Prediction</h2>
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
                <CurrCard
                  title="Current Price"
                  value={`${ethData.currentPrice}`}
                  valueColor="#6ee7b7"
                  subtextColor="#4ade80"
                  Time={ethData.timestamp || now}
                />
                <PredictionCard
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
          <h2 className="text-2xl font-semibold mb-4">Bitcoin Prediction</h2>
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
                <CurrCard
                  title="Current Price"
                  value={`${btcData.currentPrice}`}
                  valueColor="#6ee7b7"
                  subtextColor="#4ade80"
                  Time={btcData.timestamp || now}
                />
                <PredictionCard
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
          <h2 className="text-2xl font-semibold mb-4 m-8">
            What Could have been
          </h2>
        </section>
      </div>
    </main>
  );
};

export default MainPage;
