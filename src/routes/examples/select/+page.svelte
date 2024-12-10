<script lang="ts">
  import Description from "$lib/description/Description.svelte";
  import Field from "$lib/field/Field.svelte";
  import Label from "$lib/label/Label.svelte";
  import Select from "$lib/select/Select.svelte";
</script>

<div class="w-full max-w-md px-4">
  <Field>
    <Label class="text-sm/6 font-medium text-white">Project status</Label>
    <Description class="text-sm/6 text-white/50"
    >This will be visible to clients on the project.</Description>
    <div class="relative">
      <Select
        class="mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 *:text-black"
      >
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
      </Select>

      <!-- <ChevronDownIcon
        class="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
        aria-hidden="true"
      /> -->
    </div>
  </Field>
</div>
