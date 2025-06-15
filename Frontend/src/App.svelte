<script>
  import { onMount } from "svelte";
  import logo from "/src/assets/CryptoCast_logo.png";
  import CurrCard from './components/CurrCard.svelte';
  import PredictionCard from "./components/predictionCard.svelte";

  const now = "14:25:23";
  const nextHour = "15:25:23";

  let ethData = null;
  let btcData = null;
  let loading = true;
  let error = null;

  async function getEthPrice() {
    try {
      const res = await fetch("http://localhost:5000/eth");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("error =", error);
    }
  }
  async function getBthPrice() {
    try {
      const res = await fetch("http://localhost:5000/btc");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("error =", error);
    }
  }

  onMount(async () => {
    try {
      ethData = await getEthPrice();
      btcData = await getBthPrice();
      console.log("ethData loaded:", ethData);
      console.log("btcData loaded:", btcData);
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });


</script>

<main>
  <link rel="stylesheet" href="/app.css" />
  <div class="page">
    <img src={logo} alt="CryptoCast logo" class="logo" />
    <h1 id="CryptoCast">Welcome To CryptoCast</h1>

    <div class="crypto-section">
      <h1>Ethereum Prediction</h1>
      <div class="boxes">
        {#if loading}
          <p>Loading Ethereum data...</p>
        {:else if error}
          <p>Error loading data: {error}</p>
        {:else if ethData && ethData.currentPrice}
          <CurrCard
            title="Current Price"
            value={`${ethData.currentPrice}`}
            valueColor="#6ee7b7"
            subtext={`${ethData.priceChange} (${ethData.percentChange})`}
            subtextColor="#4ade80"
            Time={now}
          />
          <PredictionCard
            title="Next Hour Prediction"
            value={`${ethData.predictedPrice}`}
            valueColor="#60a5fa"
            subtext={ethData.trend}
            subtextColor={ethData.trend === "▲ Bullish" ? "#4ade80" : "#f87171"}
            Time={nextHour}
          />
        {:else}
          <p>No data available</p>
        {/if}
      </div>
      <h1>Bitcoin Prediction</h1>
      <div class="boxes">
        {#if loading}
          <p>Loading Bitcoin data...</p>
        {:else if error}
          <p>Error loading data: {error}</p>
        {:else if btcData && btcData.currentPrice}
          <CurrCard
            title="Current Price"
            value={`${btcData.currentPrice}`}
            valueColor="#6ee7b7"
            subtext={`${btcData.priceChange} (${btcData.percentChange})`}
            subtextColor="#4ade80"
            Time={now}
          />
          <PredictionCard
            title="Next Hour Prediction"
            value={`${btcData.predictedPrice}`}
            valueColor="#60a5fa"
            subtext={btcData.trend}
            subtextColor={btcData.trend === "▲ Bullish" ? "#4ade80" : "#f87171"}
            Time={nextHour}
          />
        {:else}
          <p>No data available</p>
        {/if}
      </div>
    </div>
  </div>
</main>