<script lang="ts">
  import '$lib/global.css'
  import Barcode from '$lib/components/Barcode.svelte';
	import { onMount } from 'svelte';
  let inputRef = $state<HTMLInputElement>();
  let inputValue = $state('');
  let barcodes = $state<string[]>([]);
  let isPrintMode = $state(false);

   const localStorageKey = "barcode-entries"; 

  function generateBarcodes() {
    if (!inputValue) return;
    // Split by whitespace or comma
    barcodes = inputValue.split(/\s+|,/).map(b => b.trim()).filter(Boolean);
  }

  function printBarcodes() {
    isPrintMode = true; // This will add .print-barcodes to the barcode div for styling
    setTimeout(() => {
      window.print();
      // After print, restore normal mode
      setTimeout(() => { isPrintMode = false; }, 500);
    }, 100);
  }

   onMount(() => {
    try {
      const storedInputValue = localStorage.getItem(localStorageKey);
      if (storedInputValue !== null) {
        inputValue = storedInputValue;
        if (inputValue.trim()) {
          generateBarcodes();
        }
      }
    } catch (error) {
      console.warn("Failed to read barcode entries from localStorage:", error);
    }
  });

  $effect(() => {
    try {
      localStorage.setItem(localStorageKey, inputValue);
    } catch (error) {
      console.warn("Failed to save barcode entries to localStorage:", error);
    }
  });
</script>

<div style="display: flex; flex-direction: column; align-items: center; min-height: 100vh;">
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
		<div
			class:print-barcodes={isPrintMode}
			style="display: flex; flex-direction: column; align-items: center; width: 100%;"
		>
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
		/* This style applies when isPrintMode is true (briefly, during printing).
     Ensure it aligns with or is overridden by your @media print styles in global.css if needed.
     The user's provided global.css has 'flex-direction: column' for .print-barcodes in @media print,
     while this local style has 'flex-direction: row !important;'.
     The !important here will likely take precedence during print.
     Adjust if print layout should be column.
  */
		flex-direction: row !important;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}
</style>
