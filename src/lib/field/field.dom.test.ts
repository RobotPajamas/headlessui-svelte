import { render, screen } from "@testing-library/svelte";
import type { SvelteComponent } from "svelte";

function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

describe("Rendering", () => {
  it("should render a `Field` component", async () => {
    const component = await sveltify(`
      <script>
        import Field from "$lib/field/Field.svelte";
      </script>
      <Field>
        <input />
      </Field>
    `);
    const { container } = render(component);

    expect(container.firstElementChild).not.toHaveAttribute("aria-disabled", "true");
  });

  it.skip("should render a `Field` component with a render prop", async () => {
    const component = await sveltify(`
      <script>
        import Field from "$lib/field/Field.svelte";
      </script>
      <Field>
        <input />
      </Field>
    `);
    const { container } = render(component);

    // let { container } = render(
    //   <Field>
    //     {(slot) => {
    //       return (
    //         <div data-slot={JSON.stringify(slot)}>
    //           <input />
    //         </div>
    //       )
    //     }}
    //   </Field>
    // )

    expect(container.querySelector("[data-slot]")?.getAttribute("data-slot")).toEqual(
      JSON.stringify({ disabled: false }),
    );
    expect(container.firstChild).not.toHaveAttribute("aria-disabled", "true");
  });

  it("should add `aria-disabled` when a `Field` is disabled", async () => {
    const component = await sveltify(`
      <script>
          import Field from "$lib/field/Field.svelte";
      </script>
      <Field disabled>
        <div ></div>
      </Field>
    `);
    const { container } = render(component);

    expect(container.firstElementChild).toHaveAttribute("aria-disabled", "true");
  });

  it("should inherit the `disabled` state from a parent `Fieldset`", async () => {
    const component = await sveltify(`
      <script>
          import Field from "$lib/field/Field.svelte";
          import Fieldset from "$lib/fieldset/Fieldset.svelte";
      </script>
      <Fieldset disabled>
        <Field>
          <input />
        </Field>
      </Fieldset>
    `);
    const { container } = render(component);

    let fieldset = container.firstElementChild;
    let field = fieldset?.firstElementChild;

    expect(fieldset).toHaveAttribute("disabled");
    expect(field).toHaveAttribute("aria-disabled", "true");
  });
});
