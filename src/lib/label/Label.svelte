<script lang="ts">
  import { type Component, onMount, type Snippet } from "svelte";
  import { useId } from "../../hooks/use-id";
  import { useLabelContext } from "./LabelProvider.svelte";
  import { useDisabled } from "$lib/internal/DisabledProvider.svelte";

  type Props = {
    /** The element or component the input should render as. */
    as?: string | Component;
    /** TODO: Fix naming */
    htmlFor?: string;
    /** When true, clicking the label won't focus the associated form control. */
    passive?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the parent `Field` is disabled. */
    disabled?: boolean;
  };

  let {
    id = `headlessui-label-${useId()}`,
    as = "label",
    htmlFor,
    passive = false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  function onclick(e: MouseEvent) {
    e.preventDefault;
  }

  let labelContext = useLabelContext();
  onMount(() => labelContext.register(id));

  let ourProps = $derived({
    id,
    for: htmlFor,
    onclick,
  });

  let disabled = useDisabled() || false;

  let snippetProps: SnippetProps = $derived({
    disabled,
  });

  let dataAttributes: DataAttributes<SnippetProps> = $derived({
    "data-disabled": disabled || undefined,
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
