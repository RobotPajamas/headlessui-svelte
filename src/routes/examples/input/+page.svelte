<script lang="ts">
  import Field from "$lib/field/Field.svelte";
  import Input from "$lib/input/Input.svelte";
</script>

<div class="w-full max-w-md px-4">
  <Field>
    <p class="text-sm/6 font-medium text-white">Name</p>
    <p class="text-sm/6 text-white/50">
      Use your real name so people will recognize you.
    </p>
    <Input
      class="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
    />
  </Field>
</div>
