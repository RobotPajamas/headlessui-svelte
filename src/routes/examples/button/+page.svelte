<script lang="ts">
  import Button from "$lib/button/Button.svelte";
</script>

<!-- Added in headlessui-svelte: data-active css, onclick -->
<Button
  class="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 data-focus:outline-1 data-focus:outline-white"
  onclick={() => alert("You clicked the button...")}
>Save changes
</Button>
