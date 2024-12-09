<script lang="ts">
  import { type Component, getContext, setContext, type Snippet } from "svelte";
  import { useId } from "../../hooks/use-id";
  import LabelProvider from "$lib/label/LabelProvider.svelte";
  import DisabledProvider, { useDisabled } from "$lib/internal/DisabledProvider.svelte";

  type Props = {
    /** The element or component the checkbox should render as. */
    as?: string | Component;
    /** Whether or not the field is disabled. */
    disabled?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the field is disabled. */
    disabled?: boolean;
  };

  let providedDisabled = useDisabled();

  let {
    id = `headlessui-control-${useId()}`,
    as = "div",
    disabled = providedDisabled || false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  let ourProps = $derived({
    disabled: disabled || undefined,
    "aria-disabled": disabled || undefined,
  });

  let snippetProps: SnippetProps = $derived({
    disabled,
  });

  // TODO: Utility function to create this
  let dataAttributes: DataAttributes<SnippetProps> = $derived({
    "data-disabled": disabled || undefined,
  });
</script>

<DisabledProvider {disabled}>
  <LabelProvider name="FieldLabel">
    {#if typeof as === "string"}
      <svelte:element
        this={as}
        {...theirProps}
        {...ourProps}
        {...dataAttributes}
      >
        {@render children?.(snippetProps)}
      </svelte:element>
    {:else}
      {@const AsComponent = as}
      <AsComponent {...theirProps} {...ourProps} {...dataAttributes}>
        {@render children?.(snippetProps)}
      </AsComponent>
    {/if}
  </LabelProvider>
</DisabledProvider>
