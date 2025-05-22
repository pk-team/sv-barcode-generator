# base intructions

- sveltekit app
- using bun instead of nnpm
- create a sveltekit appication using `bunx sv create .`
- It uses typescript
- Uses svelte 5 runes like $state, $effect, $derived and $props
- all global css goes in `$lib/global.css`
- css for specific components goes in the svelte <style></style> tags
- use typescript and typescript svelte component <script lang="ts">


search for: 
use the 
https://svelte.dev/docs/svelte/what-are-runes
https://svelte.dev/docs/svelte/$state
https://svelte.dev/docs/svelte/$derived
https://svelte.dev/docs/svelte/$effect
https://svelte.dev/docs/svelte/snippet

use snippets if it keeps the code cleaner


# features

This is an app to generate barcodes to be printed on A4 sheets of paper.
It has a title "Print Barcode Generator"
Below the title it has an input element with a place holder with 'barcodes'
To the right of the input is a button to trigger the generation
WHen clicked the button triggers a function which generates 'CODE128' barocdes
The rendering of each barcode is delegated to a Barcode.svelte component in a $lib/components folder
Once the the barcodes have been generated an "Print" button appears at the top.
When clicked all the other elements on the page are hidden except for the barcodes which are centered vertically
and horizontally in up to 2 columns.
The print dialog is triggered programmatially
The user is expeced to select an A4 size when the dialog appears.
After printing the view can go back to normal mode where titles an input buxes appear


- Do not create the following files as they are already include in after running `bunx sv create`
- The `bunx sv create .` will add all the infrastructure files, you just add the functionality.
- All packages are added as dev dependencies



# packages

- Use [`jsbarcode`](https://github.com/lindell/JsBarcode) for generating CODE128 barcodes as SVG.
- Install `jsbarcode` with `bun add jsbarcode`.
- Use SvelteKit's built-in routing and file structure.
- No additional UI libraries are required; use Svelte's built-in features for styling and layout.
- For printing, use the browser's native `window.print()` function.


# examples for using $state, $derviced

<script lang=ts>

 let input= $state<HtmlnputElemnt>()
 Let count = $state<number>(1)
 let double = $derived(count * 2)


</script>

Exampel `Barcode.svelte` and use of $props for cmponent properties

<script lang="ts">
   interface Props {
     barcodeValue: string
   }
   let {barcodeValue}: Props = $props()


</script>