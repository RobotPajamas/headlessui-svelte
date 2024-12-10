<script lang="ts">
  const components = ["button", "checkbox", "fieldset", "input", "switch", "textarea"];
</script>

<nav>
  <div class="border-t border-white/[7.5%] py-7">
    <h3 class="px-4 pb-4 font-mono text-xs font-semibold uppercase tracking-widest text-white/50">
      Forms
    </h3>
    <div class="flex flex-col gap-4 px-4">
      {#each components as component}
        <!-- data-active={$page.url.pathname === component} -->
        <a
          class="group block whitespace-nowrap py-2 px-6 text-white/80 transition-colors duration-200 hover:text-white data-active:font-semibold data-active:text-white lg:py-0 lg:px-0 lg:text-sm"
          href="/{component}"
        >{component}</a>
      {/each}
    </div>
  </div>
</nav>
