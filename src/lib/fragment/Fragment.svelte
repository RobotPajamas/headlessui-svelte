<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children?: Snippet<[any]>;
  };

  let { children, ...restProps }: Props = $props();
</script>

{@render children?.(restProps)}
