<script lang="ts">
  import { type Component, getContext, setContext, type Snippet } from "svelte";
  import LabelProvider from "$lib/label/LabelProvider.svelte";
  import DisabledProvider, { useDisabled } from "$lib/internal/DisabledProvider.svelte";

  type Props = {
    /** The element or component the fieldset should render as. */
    as?: string | Component;
    /** Use this to disable all form controls in the fieldset. */
    disabled?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the fieldset is disabled. */
    disabled?: boolean;
  };

  let providedDisabled = useDisabled();

  let {
    as = "fieldset",
    disabled = providedDisabled || false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  let ourProps = $derived({
    disabled: disabled || undefined,
    role: as !== "fieldset" ? "group" : undefined,
    "aria-disabled": as !== "fieldset" ? disabled : undefined,
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
  <LabelProvider name="FieldsetLabel">
    {#snippet labelledBy({ labelIds })}
      {#if typeof as === "string"}
        <svelte:element
          this={as}
          {...theirProps}
          {...ourProps}
          {...dataAttributes}
          aria-labelledby={labelIds[0]}
        >
          {@render children?.(snippetProps)}
        </svelte:element>
      {:else}
        {@const AsComponent = as}
        <AsComponent
          {...theirProps}
          {...ourProps}
          {...dataAttributes}
          aria-labelledby={labelIds}
        >
          {@render children?.(snippetProps)}
        </AsComponent>
      {/if}
    {/snippet}
  </LabelProvider>
</DisabledProvider>
