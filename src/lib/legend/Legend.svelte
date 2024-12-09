<script lang="ts">
  import Label from "$lib/label/Label.svelte";

  let { ...theirProps } = $props();
</script>

<Label as="div" {...theirProps} />
