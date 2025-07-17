<script lang="ts">
  import { useDescribedBy } from "$lib/description/DescriptionProvider.svelte";
  import Fragment from "$lib/fragment/Fragment.svelte";
  import { useDisabled } from "$lib/internal/DisabledProvider.svelte";
  import { useId } from "$lib/internal/hooks/use-id";
  import { useLabelledBy } from "$lib/label/LabelProvider.svelte";
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
    // value?
  };

  let {
    as = "button",
    autofocus = false,
    disabled = useDisabled() || false,
    id = `headlessui-listbox-button-${useId()}`,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  // TODO: Handle Key events

  let describedBy = $derived(useDescribedBy());
  let labelledBy = $derived(useLabelledBy([id]));

  let ourProps = $derived({
    id,
    autofocus,
    disabled,
    // "aria-describedby": describedBy,
    // "aria-invalid": invalid, // ? "" : undefined,
    // "aria-labelledby": labelledBy,
  });

  let snippetProps: SnippetProps = $derived({
    active: false,
    autofocus,
    disabled,
    focus: false,
    hover: false,
    invalid: false,
    open: false,
    // value?
  });

  // TODO: Utility function to create this
  let dataAttributes: DataAttributes<SnippetProps> = $derived({
    "data-active": false || undefined,
    "data-autofocus": autofocus || undefined,
    "data-disabled": disabled || undefined,
    "data-focus": false || undefined,
    "data-hover": false || undefined,
    "data-invalid": false || undefined,
    "data-open": false || undefined,
  });
</script>

{#if typeof as === "string"}
  <svelte:element this={as} {...theirProps} {...ourProps} {...dataAttributes}>
    {@render children?.(snippetProps)}
  </svelte:element>
{:else}
  {@const AsComponent = as}
  <AsComponent {...theirProps} {...ourProps} {...dataAttributes}>
    {@render children?.(snippetProps)}
  </AsComponent>
{/if}
