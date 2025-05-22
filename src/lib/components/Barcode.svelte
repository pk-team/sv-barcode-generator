<script lang="ts">
  
  import JsBarcode from 'jsbarcode'
  interface Props {
    barcodeValue: string;
  }
  let { barcodeValue }: Props = $props();
  let svgEl: SVGSVGElement | null = null;

  $effect(() => {
    if (svgEl && barcodeValue) {
      JsBarcode(svgEl, barcodeValue, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 18,
        height: 60,
        width: 2.2,
        margin: 8,
        background: '#fff',
        lineColor: '#222',
      });
    }
  });
</script>

<div class="barcode-container">
  <svg bind:this={svgEl}></svg>
</div>

<style>
.barcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed #222;
  border-radius: 18px;
  padding: 0.7rem 1.2rem 0.2rem 1.2rem;
  margin: 0.7rem 0;
  background: #fff;
  min-width: 220px;
}
svg {
  width: 200px;
  height: 80px;
}
</style>