<script lang="ts">
  import { type Component, type Snippet } from "svelte";
  import { useId } from "$lib/internal/hooks/use-id";
  import { useLabelledBy } from "$lib/label/LabelProvider.svelte";
  import { useDisabled } from "$lib/internal/DisabledProvider.svelte";

  type Props = {
    /** The element or component the input should render as. */
    as?: string | Component;
    /** Whether or not the input should receive focus when first rendered. */
    autofocus?: boolean;
    /** Whether or not the input is disabled. */
    disabled?: boolean;
    /** Whether or not the input is invalid. */
    invalid?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the autofocus prop was set to true. */
    autofocus?: boolean;
    /** Whether or not the input is invalid. */
    invalid?: boolean;
    /** Whether or not the input is disabled. */
    disabled?: boolean;
    /** Whether or not the input is focused. */
    focus?: boolean;
    /** Whether or not the input is hovered. */
    hover?: boolean;
  };

  let {
    id = `headlessui-textarea-${useId()}`,
    as = "textarea",
    autofocus = false,
    disabled = useDisabled() || false,
    invalid = false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  let labelledBy = $derived(useLabelledBy());

  let ourProps = $derived({
    id,
    autofocus,
    disabled,
    "aria-invalid": invalid, // ? "" : undefined,
    "aria-labelledby": labelledBy?.[0],
    // "aria-describedby": describedBy,
  });

  let snippetProps: SnippetProps = $derived({
    autofocus,
    disabled,
    focus: false,
    hover: false,
    invalid,
  });

  // TODO: Utility function to create this
  let dataAttributes: DataAttributes<SnippetProps> = $derived({
    "data-autofocus": autofocus || undefined,
    "data-disabled": disabled || undefined,
    "data-focus": invalid || undefined,
    "data-hover": invalid || undefined,
    "data-invalid": invalid || undefined,
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
