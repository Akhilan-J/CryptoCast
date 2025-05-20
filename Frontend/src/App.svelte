<script>
  import logo from "/src/assets/CryptoCast_logo.png"
  import predictionCard from './components/predictionCard.svelte';
  import CurrCard from './components/CurrCard.svelte';
  import PredictionCard from "./components/predictionCard.svelte";
  const now = "14:25:23";
  const nextHour = "15:25:23";
</script>

<main>
  <link rel="stylesheet" href="/app.css" />
  <div class="page">
    <img src={logo} alt="CryptoCast logo" class="logo" />
    <h1 id="CryptoCast">Welcome To CryptoCast</h1>
      <div class="Btc">
        <h1>Bitcoin Prediction</h1>
        <div class="boxes">
          <CurrCard
            title="Current Price"
            value="$59,876.43"
            valueColor="#6ee7b7"
            subtext="▲ $369.43 (0.62%)"
            subtextColor="#4ade80"
            Time={now}/>
          <PredictionCard
            title="Next Hour Prediction"
            value="$60,245.86"
            valueColor="#60a5fa"
            subtext="▲ Bullish"
            subtextColor="#4ade80"
            Time={nextHour}
            />
        </div>
    </div>
    <div class=Eth>
      <h1>Etherum Prediction</h1>
        <div class="boxes">
          <CurrCard
            title="Current Price"
            value="$59,876.43"
            valueColor="#6ee7b7"
            subtext="▲ $369.43 (0.62%)"
            subtextColor="#4ade80"
            Time={now}/>
          <PredictionCard
            title="Next Hour Prediction"
            value="$60,245.86"
            valueColor="#60a5fa"
            subtext="▲ Bullish"
            subtextColor="#4ade80"
            Time={nextHour}
            />
        </div>
    </div>
  <style>
    h1{
      font-family: 'Inter Variable', sans-serif;
    }
  </style>
</main>
