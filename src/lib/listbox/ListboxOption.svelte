<script lang="ts">
  import type { Component, Snippet } from "svelte";

  type Props = {
    /** The element or component the listbox option should render as. */
    as?: string | Component;
    /** Whether or not the listbox option is disabled for keyboard navigation and ARIA purposes. */
    disabled?: Node[];
    /** The option value. */
    value?: string;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the listbox option is disabled. */
    disabled?: boolean;
    /** Whether or not the listbox option is focused. */
    focus?: boolean;
    /** Whether or not the listbox option is selected. */
    selected?: boolean;
    /** Whether or not the listbox option is a child of `ListboxSelectedOption`. */
    selectedOption?: boolean;
  };
</script>

<div></div>
