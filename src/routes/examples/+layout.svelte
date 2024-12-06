<script lang="ts">
  import "../../app.css";

  let { children } = $props();
</script>

<div class="relative bg-white/5">
  <div class="absolute inset-[35%] block rounded-full bg-white/15 blur-2xl"></div>
  <div class="relative flex min-h-screen w-full flex-col items-center justify-center">
    {@render children()}
  </div>
</div>
