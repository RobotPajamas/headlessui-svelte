import Button from "./Button.svelte";
function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}
import type { SvelteComponent } from "svelte";
import { render, screen } from "@testing-library/svelte";

describe("Rendering", async () => {
  describe("Button", async () => {
    it("should render a button", async () => {
      const component = await sveltify(`
        <script>
          import Button from "$lib/button/Button.svelte";
        </script>
        <Button>My Button</Button>
      `);
      render(component);

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it('should default to `type="button"`', async () => {
      const component = await sveltify(`
        <script>
          import Button from "$lib/button/Button.svelte";
        </script>
        <Button>My Button</Button>
      `);
      render(component);

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render a button using a render prop", async () => {
      const component = await sveltify(`
        <script>
          import Button from "$lib/button/Button.svelte";
        </script>
        <Button>
          {#snippet children(props)}
            {JSON.stringify(props)}
          {/snippet}
        </Button>
      `);
      render(component);

      expect(screen.getByRole("button").textContent).toEqual(
        JSON.stringify({
          active: false,
          autofocus: false,
          disabled: false,
          focus: false,
          hover: false,
        }),
      );
    });

    it("should map the `autoFocus` prop to a `data-autofocus` attribute", async () => {
      const component = await sveltify(`
        <script>
          import Button from "$lib/button/Button.svelte";
        </script>
        <Button autofocus>My Button</Button>
      `);
      render(component);

      expect(screen.getByRole("button")).toHaveAttribute("data-autofocus");
    });

    it.skip("should be possible to render a Button using as={Fragment}", async () => {
      const component = await sveltify(`
        <script>
          import Button from "$lib/button/Button.svelte";
          import Fragment from "$lib/fragment/Fragment.svelte";
        </script>
        <Button as={Fragment}>
          <button>Toggle</button>
        </Button>
      `);
      render(component);

      expect(screen.getByRole("button")).toHaveAttribute("type");
    });
  });
});
