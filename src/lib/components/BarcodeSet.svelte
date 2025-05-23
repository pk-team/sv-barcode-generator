<script lang="ts">
	import Barcode from './Barcode.svelte';
	import type { Spacing } from './types';

interface Props {
  barcodes: string[];
  isPrintMode: boolean;
  spacing?: Spacing;
}
let { barcodes, isPrintMode, spacing = 'Default' }: Props = $props();

// Map spacing to gap values
const gapMap: Record<Spacing, string> = {
  Default: '2rem',
  Smaller: '1rem',
  Smallest: '0.3rem'
};
const printGapMap: Record<Spacing, string> = {
  Default: '0.5rem',
  Smaller: '0.25rem',
  Smallest: '0.1rem'
};
const gap = isPrintMode ? printGapMap[spacing] : gapMap[spacing];
</script>

<div
  class:print-barcodes={isPrintMode}
  style="display: flex; flex-direction: column; align-items: center; width: 100%;"
>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: {gap}; width: 100%;">
	{#each barcodes as code, i}
	  <Barcode barcodeValue={code} {spacing} {gap} {isPrintMode} />
	{/each}
  </div>
</div>

<style>
	.print-barcodes {
		flex-direction: row !important;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		/* gap is set inline for dynamic spacing */
	}
</style>
