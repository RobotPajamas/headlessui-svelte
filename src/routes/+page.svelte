<script lang="ts">
  import Button from "$lib/button/Button.svelte";
  import Input from "$lib/input/Input.svelte";
  import Switch from "$lib/switch/Switch.svelte";
  import "../app.css";

  let checked = $state(false);
</script>

<main>
  <h1>Button</h1>

  <Button />

  <h1>Switch</h1>

  <Switch />

  <Switch>Hello</Switch>

  <Switch>
    {#snippet children()}
      Hello snippets
    {/snippet}
  </Switch>

  <Switch>
    {#snippet children({ checked })}
      Is checked? {checked}
    {/snippet}
  </Switch>

  <br />

  <h1>Input</h1>

  <Input />
</main>
