<script lang="ts">
  import Nav from "./nav.svelte";

  let { children } = $props();
  import "../../app.css";
</script>

<div>
  <div class="relative">
    <main class="bg-black/80 px-4 sm:px-6">
      <div class="mx-auto flex max-w-7xl">
        <div class="sticky top-0 hidden h-screen w-[17rem] shrink-0 lg:block lg:pr-px xl:pr-[2px]">
          <div class="h-full overflow-y-auto pb-[calc(80px+4rem)]">
            <Nav />
          </div>
        </div>
        <main class="flex min-w-0 flex-1 pt-16">
          <div class="mx-auto max-w-[46rem] min-w-0 flex-1 px-2 md:px-8">
            {@render children()}
          </div>
        </main>
      </div>
    </main>
  </div>
</div>
