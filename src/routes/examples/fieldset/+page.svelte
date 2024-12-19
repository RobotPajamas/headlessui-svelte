<script lang="ts">
  import Description from "$lib/description/Description.svelte";
  import Field from "$lib/field/Field.svelte";
  import Fieldset from "$lib/fieldset/Fieldset.svelte";
  import Input from "$lib/input/Input.svelte";
  import Label from "$lib/label/Label.svelte";
  import Legend from "$lib/legend/Legend.svelte";
  import Select from "$lib/select/Select.svelte";
  import Textarea from "$lib/textarea/Textarea.svelte";
</script>

<div class="w-full max-w-lg px-4">
  <Fieldset class="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
    <Legend class="text-base/7 font-semibold text-white">Shipping details</Legend>
    <Field>
      <Label class="text-sm/6 font-medium text-white">Street address</Label>
      <Input
        class="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      />
    </Field>
    <Field>
      <Label class="text-sm/6 font-medium text-white">Country</Label>
      <Description class="text-sm/6 text-white/50"
      >We currently only ship to North America.</Description>
      <div class="relative">
        <Select
          class="mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 *:text-black"
        >
          <option>Canada</option>
          <option>Mexico</option>
          <option>United States</option>
        </Select>
        <!-- ChevronDownIcon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </Field>
    <Field>
      <Label class="text-sm/6 font-medium text-white">Delivery notes</Label>
      <Description class="text-sm/6 text-white/50">
        If you have a tiger, we'd like to know about it.
      </Description>
      <Textarea
        class="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
        rows={3}
      />
    </Field>
  </Fieldset>
</div>
