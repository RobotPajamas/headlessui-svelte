<script module lang="ts">
  import { getContext, type Snippet } from "svelte";

  export const DISABLED_CONTEXT_NAME = Symbol("headlessui-disabled-context");
  export function useDisabled(): boolean {
    return getContext<boolean>(DISABLED_CONTEXT_NAME);
  }
</script>

<script lang="ts">
  import { setContext } from "svelte";

  type Props = {
    /** Whether or not the children should be disabled. */
    disabled?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    disabled?: boolean;
  };

  let { disabled, children }: Props = $props();
  setContext(DISABLED_CONTEXT_NAME, disabled);
</script>

<!-- TODO: I hate this snippet children vs non-children naming convention so much -->
{@render children?.({ disabled })}
