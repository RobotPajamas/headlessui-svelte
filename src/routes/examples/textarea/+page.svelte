<script lang="ts">
  import Field from "$lib/field/Field.svelte";
  import Label from "$lib/label/Label.svelte";
  import Textarea from "$lib/textarea/Textarea.svelte";
</script>

<div class="w-full max-w-md px-4">
  <Field>
    <Label class="text-sm/6 font-medium text-white">Description</Label>
    <!-- <Description class="text-sm/6 text-white/50">This will be shown under the product title.</Description> -->
    <Textarea
      class="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      rows={3}
    />
  </Field>
</div>
