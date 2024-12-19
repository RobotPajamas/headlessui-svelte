<script lang="ts">
  import Listbox from "$lib/listbox/Listbox.svelte";
  import ListboxOption from "$lib/listbox/ListboxOption.svelte";
  import ListboxOptions from "$lib/listbox/ListboxOptions.svelte";
  import ListboxButton from "$lib/listbox/ListboxButton.svelte";

  const people = [
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
  ];
</script>

<div class="mx-auto h-screen w-52 pt-20">
  <!-- value={selected} onchange={setSelected} -->
  <Listbox>
    <!-- class="relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25" -->
    <ListboxButton>
      <!-- {selected.name} -->
      <!-- <ChevronDownIcon
        class="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
        aria-hidden="true"
      /> -->
      X
    </ListboxButton>
    <!-- anchor="bottom"
    transition
    class="w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0" -->
    <ListboxOptions>
      {#each people as person}
        <!-- key={person.name}
      value={person}
      class="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10" -->
        <ListboxOption>
          X
          <!-- <CheckIcon
            class="invisible size-4 fill-white group-data-[selected]:visible"
          /> -->
          <div class="text-sm/6 text-white">{person.name}</div>
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Listbox>
</div>
