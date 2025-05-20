<script>
  export let title = "";
  export let value = "";
  export let subtext = "";
  export let Time = "";
  export let valueColor = "#ffffff";
  export let subtextColor = "#ffffff";
  export let extra = "";
  export let extraColor = "#ffffff";
</script>

<style>
  .card {
    background-color: #1b2330;
    border-radius: 1rem;
    padding: 1.5rem;
    width: 300px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
  }

  .subtext {
    margin-top: 0.3rem;
    font-size: 0.9rem;
  }

  .timestamp {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.5rem;
  }

  .extra {
    font-size: 0.85rem;
    margin-top: 1rem;
  }
</style>

<div class="card">
  <div class="title">{title}</div>
  <div class="value" style="color: {valueColor}">{value}</div>
  <div class="subtext" style="color: {subtextColor}">{subtext}</div>
  <div class="timestamp">Updated: {Time}</div>
  {#if extra}
    <div class="extra" style="color: {extraColor}">{extra}</div>
  {/if}
</div>
