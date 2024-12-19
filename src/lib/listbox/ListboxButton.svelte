<script lang="ts">
  import type { Component, Snippet } from "svelte";

  type Props = {
    /** The element or component the listbox button should render as. */
    as?: string | Component;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the listbox button is in an active or pressed state.*/
    active?: boolean;
    /** Whether or not the `autofocus` prop was set to `true`.*/
    autofocus?: boolean;
    /** Whether or not the listbox button is disabled. */
    disabled?: boolean;
    /** Whether or not the listbox button is focused. */
    focus?: boolean;
    /** Whether or not the listbox button is hovered. */
    hover?: boolean;
    /** Whether or not the listbox is invalid. */
    invalid?: boolean;
    /** Whether or not the listbox is open. */
    open?: boolean;
  };
</script>

<div></div>
