<script lang="ts">
  
  import JsBarcode from 'jsbarcode'
  import type { Spacing } from './types';
  interface Props {
    barcodeValue: string;
    spacing?: Spacing;
    gap?: string;
  }
  let { barcodeValue, spacing = 'Default', gap = '' }: Props = $props();
  let svgEl: SVGSVGElement | null = null;

  let highlight = $state<boolean>(false);

  // Adjust barcode size and padding based on spacing
  const spacingConfig = {
    Default: {
      fontSize: 18,
      height: 60,
      width: 2.2,
      margin: 8,
      padding: '0.7rem 1.2rem 0.2rem 1.2rem',
      minWidth: '220px',
    },
    Smaller: {
      fontSize: 15,
      height: 48,
      width: 1.7,
      margin: 4,
      padding: '0.3rem 0.7rem 0.1rem 0.7rem',
      minWidth: '160px',
    },
    Smallest: {
      fontSize: 12,
      height: 36,
      width: 1.2,
      margin: 2,
      padding: '0.1rem 0.3rem 0.05rem 0.3rem',
      minWidth: '110px',
    }
  };
  $effect(() => {
    if (svgEl && barcodeValue) {
      const conf = spacingConfig[spacing] ?? spacingConfig.Default;
      JsBarcode(svgEl, barcodeValue, {
        format: 'CODE128',
        displayValue: true,
        fontSize: conf.fontSize,
        height: conf.height,
        width: conf.width,
        margin: conf.margin,
        background: '#fff',
        lineColor: '#222',
      });
    }
  });

  function handleClick() {
    highlight = !highlight;
    if (highlight) {
      navigator.clipboard.writeText(barcodeValue).then(() => {
        console.log('Barcode copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy barcode: ', err);
      });
    }
  }
</script>

<button
  type="button"
  onclick={handleClick}
  class="barcode-container"
  class:highlight={highlight}
  style="
    padding: {spacingConfig[spacing].padding};
    min-width: {spacingConfig[spacing].minWidth};
    margin: {gap};
  "
  aria-label="Barcode"
>
  <svg bind:this={svgEl}></svg>
</button>

<style>
/* Barcode button styling overrides default button styles */
.barcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 2px dashed #222;
  border-radius: 18px;
  appearance: none;
  -webkit-appearance: none;
  box-shadow: none;
  outline: none;
  transition: border 0.15s, box-shadow 0.15s;
  cursor: pointer;
}
.barcode-container.highlight {
  border-width: 3px;
  border-color: #111;
  box-shadow: 0 0 0 2px #2222, 0 2px 8px #0001;
  background: #fff;
  transition: padding 0.2s, min-width 0.2s, margin 0.2s;
}
.barcode-container:hover {
  cursor: pointer;
  background-color: #222;
}
.barcode-container.highlight {
  background-color: lightblue;
}
svg {
  width: 100%;
  height: auto;
  max-width: 200px;
  max-height: 80px;
}
</style>