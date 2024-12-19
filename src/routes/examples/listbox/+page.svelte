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

  let selected = $state("hello");
  function handleChange() {
    console.log("Changed");
  }
</script>

<div class="mx-auto h-screen w-52 pt-20">
  <Listbox value={selected} onchange={handleChange}>
    <ListboxButton
      class="relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
    >
      {selected}
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
    </ListboxButton>
    <!-- anchor="bottom"
    transition
     -->
    <ListboxOptions
      class="w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
    >
      {#each people as person}
        <!-- 
      
       -->
        <ListboxOption
          class="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
          key={person.name}
          value={person.name}
        >
          <!-- CheckIcon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="invisible size-4 fill-white group-data-[selected]:visible"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="text-sm/6 text-white">{person.name}</div>
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Listbox>
</div>
