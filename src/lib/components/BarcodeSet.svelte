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
	const gap = gapMap[spacing];
</script>

<div
	class:print-barcodes={isPrintMode}
	style="display: flex; flex-direction: column; align-items: center; width: 100%;"
>
	<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: {gap}; width: 100%;">
		{#each barcodes as code, i}
			<Barcode barcodeValue={code} {spacing} {gap} />
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
