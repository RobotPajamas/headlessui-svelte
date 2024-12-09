<script lang="ts">
  import { type Component, type Snippet } from "svelte";
  import { useDisabled } from "$lib/internal/DisabledProvider.svelte";

  type Props = {
    /** The element or component the button should render as. */
    as?: string | Component;
    /** Whether or not the button should receive focus when first rendered. */
    autofocus?: boolean;
    /** Whether or not the button is disabled. */
    disabled?: boolean;
    /** The button type. */
    type?: string;
    children?: Snippet<[SnippetProps]>;
  };

  /** The SnippetProps also live on the <Button> component as data attributes (e.g. data-active, data-hover, ...) */
  type SnippetProps = {
    /** Whether or not the autoFocus prop was set to true. */
    active?: boolean;
    /** Whether or not the button is in an active or pressed state. */
    autofocus?: boolean;
    /** Whether or not the button is disabled. */
    disabled?: boolean;
    /** Whether or not the button is focused. */
    focus?: boolean;
    /** Whether or not the button is hovered. */
    hover?: boolean;
  };

  let {
    as = "button",
    autofocus = false,
    disabled = useDisabled() || false,
    type = "button",
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  // TODO: These do nothing - should render a button using a render prop
  let active = false;
  let focus = false;
  let hover = false;

  let ourProps = {
    autofocus,
    disabled,
    role: "button",
    type,
  };

  let snippetProps: SnippetProps = $derived({
    active,
    autofocus,
    disabled,
    focus,
    hover,
  });

  // TODO: Utility function to create this
  let dataAttributes: DataAttributes<SnippetProps> = $derived({
    "data-active": active || undefined,
    "data-autofocus": autofocus || undefined,
    "data-disabled": disabled || undefined,
    "data-focus": focus || undefined,
    "data-hover": hover || undefined,
  });
</script>

{#if typeof as === "string"}
  <svelte:element this={as} {...theirProps} {...ourProps} {...dataAttributes}>
    {@render children?.({ active, autofocus, disabled, focus, hover })}
  </svelte:element>
{:else}
  {@const AsComponent = as}
  <AsComponent {...theirProps} {...ourProps} {...dataAttributes}>
    {@render children?.(snippetProps)}
  </AsComponent>
{/if}
