<script lang="ts">
  import type { Component, Snippet } from "svelte";

  type Props = {
    /** The element or component the listbox selected option should render as. */
    as?: string | Component;
    /** The element to render when no option is selected. */
    placeholder?: Node;
    /** Your full array of ListboxOption elements. ListboxSelectedOption will filter this list to find and render the currently selected option. */
    options?: Node[];
  };
</script>

<div></div>
