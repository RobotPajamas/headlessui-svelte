import { render, screen } from "@testing-library/svelte";
import type { SvelteComponent } from "svelte";
import {
  assertLinkedWithLabel,
  assertNotLinkedWithLabel,
  getControl,
  getLabels,
} from "../../test-utils/accessibility-assertions";

function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

describe("Rendering", () => {
  it("should render a `Fieldset` component", async () => {
    const component = await sveltify(`
      <script>
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
      </script>
      <Fieldset>
        <input />
      </Fieldset>
    `);
    const { container } = render(component);
    let fieldset = container.firstElementChild;

    expect(fieldset).toBeInstanceOf(HTMLFieldSetElement);
    expect(fieldset).not.toHaveAttribute("role", "group");
  });

  it("should render a `Fieldset` using a custom component", async () => {
    const component = await sveltify(`
      <script>
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
      </script>
      <Fieldset as="span">
        <input />
      </Fieldset>
    `);
    const { container } = render(component);
    let fieldset = container.firstElementChild;

    expect(fieldset).toBeInstanceOf(HTMLSpanElement);
    expect(fieldset).toHaveAttribute("role", "group");
  });

  it("should forward the `disabled` attribute when disabling the `Fieldset`", async () => {
    const component = await sveltify(`
      <script>
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
      </script>
      <Fieldset disabled>
        <input />
      </Fieldset>
    `);
    const { container } = render(component);
    let fieldset = container.firstElementChild;

    expect(fieldset).toHaveAttribute("disabled");
  });

  it("should add an `aria-disabled` attribute when disabling the `Fieldset` when using another element via the `as` prop", async () => {
    const component = await sveltify(`
      <script>
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
      </script>
      <Fieldset as="span" disabled>
        <input />
      </Fieldset>
    `);
    const { container } = render(component);
    let fieldset = container.firstElementChild;

    expect(fieldset).toHaveAttribute("aria-disabled", "true");
  });

  it("should make nested inputs disabled when the fieldset is disabled", async () => {
    const component = await sveltify(`
      <script>
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
      </script>
      <Fieldset disabled>
        <input />
      </Fieldset>
    `);
    const { container } = render(component);
    let fieldset = container.firstElementChild;

    expect(fieldset?.firstElementChild).toBeDisabled();
  });

  it("should link a `Fieldset` to a nested `Legend`", async () => {
    const component = await sveltify(`
      <script>
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
        import Legend from "$lib/legend/Legend.svelte";
      </script>
      <Fieldset>
        <Legend>My Legend</Legend>
        <input />
      </Fieldset>
    `);
    const { container } = render(component);
    let fieldset = container.firstElementChild as HTMLElement;

    assertLinkedWithLabel(fieldset, getLabels());
  });

  it("should not link a `Label` inside a `Field` to the `Fieldset`", async () => {
    const component = await sveltify(`
      <script>
        import Field from "$lib/field/Field.svelte";
        import Fieldset from "$lib/fieldset/Fieldset.svelte";
        import Input from "$lib/input/Input.svelte";
        import Label from "$lib/label/Label.svelte";
        import Legend from "$lib/legend/Legend.svelte";
      </script>
      <Fieldset>
        <Legend>My Legend</Legend>
        <Field>
          <Label>My Label</Label>
          <Input />
        </Field>
      </Fieldset>
    `);
    render(component);

    let legend = screen.getByText("My Legend");
    let label = screen.getByText("My Label");

    let fieldset = legend.parentElement;
    let field = label.parentElement;

    let input = getControl();

    // The fieldset should be linked with the legend
    assertLinkedWithLabel(fieldset, legend);

    // The input/control should be linked with the label
    // TODO: This expects that an IdProvider in Field will have re-named the input to "headlessui-control"
    // assertLinkedWithLabel(input, label);

    // The fieldset should not be linked with the label
    assertNotLinkedWithLabel(fieldset, label);

    // // The input/control should not be linked with the legend
    // TODO: This expects that an IdProvider in Field will have re-named the input to "headlessui-control"
    // assertNotLinkedWithLabel(input, legend);

    // The field should not be linked with anything
    assertNotLinkedWithLabel(field, legend);
    assertNotLinkedWithLabel(field, label);
  });
});
