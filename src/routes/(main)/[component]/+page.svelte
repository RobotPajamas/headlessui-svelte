<script lang="ts">
  import { page } from "$app/stores";
  import Nav from "../nav.svelte";
  const pageName = $derived($page.url.pathname.replace(/^\/|\/$/g, ""));
</script>

<div class="prose text-white"><h1>{pageName}</h1></div>
<div class="prose mt-4 mb-6">
  <p class="text-base/7"></p>
</div>

<div
  class="relative mt-8 mb-12 flex flex-col items-center justify-center overflow-hidden"
  style="height: 400px"
>
  <div class="size-full bg-white/5">
    <iframe
      src="examples/{pageName}"
      class="size-full [color-scheme:auto]"
      title="Button example"
    ></iframe>
  </div>
</div>

<div class="lg:hidden">
  <Nav />
</div>
