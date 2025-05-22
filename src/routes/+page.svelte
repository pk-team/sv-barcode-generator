
<script lang="ts">
  import '$lib/global.css'
  import Barcode from '$lib/components/Barcode.svelte';
  let inputRef = $state<HTMLInputElement>();
  let inputValue = $state('');
  let barcodes = $state<string[]>([]);
  let isPrintMode = $state(false);

  function generateBarcodes() {
    if (!inputValue) return;
    // Split by whitespace or comma
    barcodes = inputValue.split(/\s+|,/).map(b => b.trim()).filter(Boolean);
  }

  function printBarcodes() {
    isPrintMode = true;
    setTimeout(() => {
      window.print();
      // After print, restore normal mode
      setTimeout(() => { isPrintMode = false; }, 500);
    }, 100);
  }
</script>

<div class:hide-on-print={isPrintMode} style="display: flex; flex-direction: column; align-items: center; min-height: 100vh;">
  <h1 class="hide-on-print">Print Barcode Generator</h1>
  <div class="hide-on-print" style="display: flex; align-items: center; margin-bottom: 2rem;">
    <input
      bind:this={inputRef}
      type="text"
      placeholder="barcodes"
      bind:value={inputValue}
      onkeydown={(e) => e.key === 'Enter' && generateBarcodes()}
      style="margin-right: 1rem;"
    />
    <button onclick={generateBarcodes}>Generate</button>
    {#if barcodes.length > 0}
      <button onclick={printBarcodes}>Print!</button>
    {/if}
  </div>

  {#if barcodes.length > 0}
    <div class:print-barcodes={isPrintMode} style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; width: 100%;">
        {#each barcodes as code, i}
          <Barcode barcodeValue={code} />
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
.print-barcodes {
  /* Print layout handled in global.css */
  flex-direction: row !important;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
