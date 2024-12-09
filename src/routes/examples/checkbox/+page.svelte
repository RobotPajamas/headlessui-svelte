<script lang="ts">
  import Checkbox from "$lib/checkbox/Checkbox.svelte";
</script>

<!-- checked={enabled} -->
<!-- onChange={setEnabled} -->
<Checkbox
  checked={false}
  class="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-checked:bg-white"
>
  <p class="hidden size-4 fill-black group-data-checked:block">X</p>
  <!-- <CheckIcon
        class="hidden size-4 fill-black group-data-[checked]:block"
    /> -->
</Checkbox>
