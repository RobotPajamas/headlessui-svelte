import { render, screen } from "@testing-library/svelte";
import { getInput } from "../../test-utils/accessibility-assertions";
import type { SvelteComponent } from "svelte";

function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

// TODO: Manually unrolled test-utils/scenarios.ts commonRenderingScenarios

describe("Rendering", () => {
  it("should render an input", async () => {
    const component = await sveltify(`
      <script>
          import Input from "$lib/input/Input.svelte";
      </script>
      <Input />
    `);
    render(component);

    expect(getInput()).toBeInTheDocument();
  });

  it("should have an `id` attached", async () => {
    const component = await sveltify(`
      <script>
          import Input from "$lib/input/Input.svelte";
      </script>
      <Input />
    `);
    render(component);

    expect(getInput()).toHaveAttribute("id");
  });

  it("should be possible to override the `id`", async () => {
    const component = await sveltify(`
      <script>
          import Input from "$lib/input/Input.svelte";
      </script>
      <Input id="foo" />
    `);
    render(component);

    expect(getInput()).toHaveAttribute("id", "foo");
  });
});

describe.skip("commonControlScenarios", () => {});
describe.skip("commonFormScenarios", () => {});
