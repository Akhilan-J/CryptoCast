<script>
  import logo from "/src/assets/CryptoCast_logo.png"
  import CurrCard from './components/CurrCard.svelte';
  import PredictionCard from "./components/predictionCard.svelte";
  const now = "14:25:23";
  const nextHour = "15:25:23";
  import btcData from "/public/prediction_etc.json";
  import ethData from '../prediction_eth.json';
</script>

<main>
  <link rel="stylesheet" href="/app.css" />
  <div class="page">
    <img src={logo} alt="CryptoCast logo" class="logo" />
    <h1 id="CryptoCast">Welcome To CryptoCast</h1>

    <div class="crypto-section">
      <h1>Bitcoin Prediction</h1>
      <div class="boxes">
        <CurrCard
          title="Current Price"
          value={btcData.currentPrice || "$59,876.43"}
          valueColor="#6ee7b7"
          subtext={btcData.priceChange || "▲ $369.43 (0.62%)"}
          subtextColor="#4ade80"
          Time={now}/>
        <PredictionCard
          title="Next Hour Prediction"
          value={btcData.predictedPrice || "$60,245.86"}
          valueColor="#60a5fa"
          subtext={btcData.trend || "▲ Bullish"}
          subtextColor="#4ade80"
          Time={nextHour}
        />
      </div>
    </div>

    <div class="crypto-section">
      <h1>Ethereum Prediction</h1>
      <div class="boxes">
        <CurrCard
          title="Current Price"
          value={ethData.currentPrice || "$2,876.43"}
          valueColor="#6ee7b7"
          subtext={ethData.priceChange || "▲ $69.43 (2.48%)"}
          subtextColor="#4ade80"
          Time={now}/>
        <PredictionCard
          title="Next Hour Prediction"
          value={ethData.predictedPrice || "$2,945.86"}
          valueColor="#60a5fa"
          subtext={ethData.trend || "▲ Bullish"}
          subtextColor="#4ade80"
          Time={nextHour}
        />
      </div>
    </div>
  </div>
</main>