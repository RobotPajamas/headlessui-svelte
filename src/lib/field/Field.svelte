<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { useId } from "../../hooks/use-id";

  import { getAllContexts, getContext, setContext } from "svelte";

  // const contexts = getAllContexts();
  // console.log(contexts);

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

  let providedDisabled = getContext<boolean>("headlessui-disabled-context");
  console.log("Field: Incoming disabled context:", providedDisabled);

  let {
    id = `headlessui-control-${useId()}`,
    as = "div",
    disabled = providedDisabled || false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  let ourProps = {
    disabled,
    "aria-disabled": disabled,
  };

  let snippetProps: SnippetProps = {
    disabled,
  };

  // TODO: Utility function to create this
  let dataAttributes: DataAttributes<SnippetProps> = {
    "data-disabled": disabled,
  };

  setContext("headlessui-disabled-context", disabled);
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
