<script lang="ts">
	import Barcode from "./Barcode.svelte";

    interface Props {
        barcodes: string[];
        isPrintMode: boolean;
    }
    let { barcodes, isPrintMode }: Props = $props();
</script>

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
