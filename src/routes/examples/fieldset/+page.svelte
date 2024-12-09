<script lang="ts">
  import Field from "$lib/field/Field.svelte";
  import Fieldset from "$lib/fieldset/Fieldset.svelte";
  import Input from "$lib/input/Input.svelte";
  import Label from "$lib/label/Label.svelte";
  import Legend from "$lib/legend/Legend.svelte";
</script>

<div class="w-full max-w-lg px-4">
  <Fieldset class="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10" disabled>
    <Legend class="text-base/7 font-semibold text-white">Shipping details</Legend>
    <Field>
      <Label class="text-sm/6 font-medium text-white">Street address</Label>
      <Input
        class="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
      />
    </Field>
    [TODO Select]
    <!-- <Field>
        <p class="text-sm/6 font-medium text-white">Country</p>
        <p class="text-sm/6 text-white/50">We currently only ship to North America.</p>
        <div class="relative">
          <Select
            class={clsx(
              'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
              // Make the text of each option black on Windows
              '*:text-black'
            )}
          >
            <option>Canada</option>
            <option>Mexico</option>
            <option>United States</option>
          </Select>
          <ChevronDownIcon
            class="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field> -->
    <Field>
      <Label class="text-sm/6 font-medium text-white">Delivery notes</Label>
      <p class="text-sm/6 text-white/50">
        If you have a tiger, we'd like to know about it.
      </p>
      [TODO: TextArea]
      <!-- <Textarea
          class={clsx(
            'mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
          rows={3}
        /> -->
    </Field>
  </Fieldset>
</div>
