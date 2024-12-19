<script lang="ts">
  import type { Component, Snippet } from "svelte";

  type Props = {
    /** Configures the way the dropdown is anchored to the button. */
    anchor?: {
      /**
       * The space between the listbox button and the listbox options.
       * Can also be controlled using the `--anchor-gap` CSS variable.
       */
      gap?: Number | string;
      /**
       * The distance the listbox options should be nudged from its original position.
       * Can also be controlled using the `--anchor-offset` CSS variable.
       */
      offset?: Number | string;
      /**
       * The minimum space between the listbox options and the viewport.
       * Can also be controlled using the `--anchor-padding` CSS variable.
       */
      padding?: Number | string;
      /**
       * Where to position the listbox options relative to the trigger.
       * Use the values `top`, `right`, `bottom`, `left` to center the listbox options
       * along the appropriate edge, or combine it with `start` or `end` to align the
       * listbox options to a specific corner, such as `top start` or `bottom end`.
       * Alternatively, use the `selection` option to position the currently selected
       * option directly above the listbox button.
       */
      to?: string;
    };
    /** The element or component the listbox options should render as. */
    as?: string | Component;
    /**
     * Whether to enable accessibility features like scroll locking,
     * focus trapping, and making other elements `inert`.
     */
    modal?: boolean;
    /** The element to render when no option is selected. */
    placeholder?: Node;
    /**
     * Whether the element should be rendered in a portal.
     * Automatically set to `true` when `anchor` prop is set.
     */
    portal?: boolean;
    /** Your full array of ListboxOption elements. ListboxSelectedOption will filter this list to find and render the currently selected option. */
    options?: Node[];
    /** Whether the element should ignore the internally managed open/closed state. */
    static?: boolean;
    /** Whether the element should render transition attributes like `data-closed`, `data-enter` and `data-leave`. */
    transition?: boolean;
    /** Whether the element should be unmounted or hidden based on the open/closed state. */
    unmount?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the listbox is open. */
    open?: boolean;
  };
</script>

<div></div>
