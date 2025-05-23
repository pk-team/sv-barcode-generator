<script lang="ts">
  import '$lib/global.css'
  import Barcode from '$lib/components/Barcode.svelte';
  import { onMount } from 'svelte';
  import BarcodeSet from '$lib/components/BarcodeSet.svelte';
  import type { Spacing } from '$lib/components/types';

  let inputRef = $state<HTMLTextAreaElement| null>(null);
  let inputValue = $state('');
  let barcodes = $state<string[]>([]);
  let isPrintMode = $state(false);
  let spacing: Spacing = $state('Default');

   const localStorageKey = "barcode-entries"; 

  function generateBarcodes() {
    if (!inputValue) return;
    // Split by whitespace or comma
    barcodes = inputValue.split(/\s+|,/).map(b => b.trim()).filter(Boolean);
  }

  // Optionally allow user to select spacing level
  const spacingOptions: Spacing[] = ['Default', 'Smaller', 'Smallest'];

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
  <h1 class="hide-on-print">Barcode Generator</h1>

  <div class="hide-on-print" style="display: flex; align-items: flex-start; margin-bottom: 2rem; gap: 1.5rem;">
    <textarea
      bind:this={inputRef}
      placeholder="Enter barcodes"
      bind:value={inputValue}
      rows={6}
      style="min-width: 450px; min-height: 100px; resize: vertical; overflow-y: auto; border-radius: 2rem; padding: 1rem; font-size: 1rem;"
    ></textarea>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <label style="font-size: 1rem; font-weight: 500;">Spacing:
        <select bind:value={spacing} style="margin-left: 0.5rem; font-size: 1rem; border-radius: 8px; padding: 0.2rem 0.7rem;">
          {#each spacingOptions as opt}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      </label>
      <button onclick={generateBarcodes}>Generate</button>
      {#if barcodes.length > 0}
        <button onclick={printBarcodes}>Print!</button>
      {/if}
    </div>
  </div>

  {#if barcodes.length > 0}
    <BarcodeSet {barcodes} {isPrintMode} {spacing} />
  {/if}
</div>

