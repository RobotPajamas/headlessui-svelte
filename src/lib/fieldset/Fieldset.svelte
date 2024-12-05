<script lang="ts">
  import { type Component, getContext, setContext, type Snippet } from "svelte";

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

  let providedDisabled = getContext<boolean>("headlessui-disabled-context");
  let {
    as = "fieldset",
    disabled = providedDisabled || false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  let ourProps = as === "fieldset"
    ? {
      disabled,
      // 'aria-labelledby': labelledBy
    }
    : {
      role: "group",
      "aria-disabled": disabled,
      // 'aria-labelledby': labelledBy
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
