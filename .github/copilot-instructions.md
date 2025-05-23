Copilot Instructions for sv-barcode-gen (SvelteKit + Runes):

1. Use SvelteKit and Runes best practices:
   - Use the Runes API for state management and reactivity.
   - Prefer `let` and `const` with Runes stores for reactive values.
   - Dotnot use the $ prefix use $effect or $derived instead.

2. Component Structure:
   - Each logical UI part should be its own Svelte component.
   - If a component grows large (many lines or responsibilities), split it into smaller, focused components.
   - Place components in the `src/lib/components` directory.
   - Use PascalCase for component filenames.
   - Import files and component from the `src/lib` using the `$lib` alias.

3. Component Communication:
   - Pass data via props.
   - Use Runes stores for shared state.
   - Avoid tightly coupling components.
   - all components have export props using this technique.

   ```svelte
   <s lang="ts>
     interface Props {
       name: string;
       value: string;
     }
     let { name, value }: Props = $props();
   </script>
   ```

4. Code Organization:
   - Keep markup, script, and style sections organized.
   - Use TypeScript for type safety.
   - Add comments for complex logic.

5. Accessibility & Styling:
   - Use semantic HTML.
   - DO NOT use ARIA attributes
   - Use scoped styles or Tailwind CSS if available.

6. Testing:
   - Write unit tests for complex logic.
   - Use Playwright or Vitest for integration tests.

7. Documentation:
   - Document components and props.
   - Update this instruction block if conventions change.

Reference:
- Runes: https://github.com/sveltejs/runes
- SvelteKit: https://kit.svelte.dev/docs

## commit messages
- Always use the imperative mood
- The first commit lines always starts with `feat:`, `fix:`, `refactor:` ...
- The first commit line shoud be a maximum of 55 characters
- Be extremely detailed in the body section of the commit.