<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { useId } from "$lib/internal/hooks/use-id";
  import { useDisabled } from "$lib/internal/DisabledProvider.svelte";
  import { useDescribedBy } from "$lib/description/DescriptionProvider.svelte";
  import { useLabelledBy } from "$lib/label/LabelProvider.svelte";

  type Props = {
    /** The element or component the checkbox should render as. */
    as?: string | Component;
    /** Whether or not the checkbox should receive focus when first rendered. */
    autofocus?: boolean;
    /** Whether or not the checkbox is checked. */
    checked?: boolean;
    // TODO:  defaultChecked
    /** Whether or not the checkbox is disabled. */
    disabled?: boolean;
    /**
     * The id of the form that the checkbox belongs to.
     * If name is provided but form is not, the switch will add its state to the nearest ancestor form element.
     */
    form?: string;
    /** Whether or not the checkbox is indeterminate. */
    indeterminate?: boolean;
    /** The name used when using the checkbox inside a form. */
    name?: string;
    /** The value used when using this component inside a form, if it is checked. */
    value?: string;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the checkbox is in an active or pressed state. */
    active?: boolean;
    /** Whether or not the autofocus prop was set to true. */
    autofocus?: boolean;
    /**
     * Whether or not the checked state is currently changing.
     * When the checked state changes, changing will be true for two animation frames,
     * allowing you to fine-tune transitions.
     */
    changing?: boolean;
    /** Whether or not the checkbox is checked. */
    checked?: boolean;
    /** Whether or not the checkbox is disabled. */
    disabled?: boolean;
    /** Whether or not the checkbox is focused. */
    focus?: boolean;
    /** Whether or not the checkbox is hovered. */
    hover?: boolean;
    /** Whether or not the checkbox is indeterminate. */
    indeterminate?: boolean;
  };

  let {
    id = `headlessui-checkbox-${useId()}`,
    as = "span",
    autofocus = false,
    checked = false,
    disabled = useDisabled() || false,
    indeterminate = false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  function toggle() {
    checked = !checked;
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    toggle();
  }

  let describedBy = $derived(useDescribedBy());
  let labelledBy = $derived(useLabelledBy());

  let ourProps = $derived({
    id,
    autofocus,
    disabled,
    role: "checkbox",
    "aria-checked": checked,
    // "aria-invalid": invalid, // ? "" : undefined,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
    onclick,
  });

  let snippetProps: SnippetProps = $derived({
    autofocus,
    checked,
    disabled,
    focus: false,
    hover: false,
  });

  // TODO: Utility function to create this
  let dataAttributes: DataAttributes<SnippetProps> = $derived({
    "data-autofocus": autofocus || undefined,
    "data-checked": checked || undefined,
    "data-disabled": disabled || undefined,
    "data-focus": false || undefined,
    "data-hover": false || undefined,
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
