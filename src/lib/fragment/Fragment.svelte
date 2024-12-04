<script lang="ts">
  let { children, ...restProps } = $props();
</script>

{@render children?.(restProps)}
