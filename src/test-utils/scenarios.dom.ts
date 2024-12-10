// MIT License

// Copyright (c) 2020 Tailwind Labs

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// https://github.com/tailwindlabs/headlessui
// https://github.com/tailwindlabs/headlessui/blob/d71fb9cd2e12f5a48617b26e6bb3db90b3e07965/packages/%40headlessui-react/src/test-utils/scenarios.ts

// TODO: Unused until I can get Svelte components transpiling correctly from different files

// import { render, screen } from '@testing-library/react'
// import React from 'react'
// import { Description, Field, Fieldset, Label } from '..'
// import {
//   assertActiveElement,
//   assertDisabledish,
//   assertLinkedWithDescription,
//   assertLinkedWithLabel,
//   getControl,
//   getDescriptions,
//   getLabel,
//   getLabels,
// } from './accessibility-assertions'
// import { click } from './interactions'
// import { suppressConsoleLogs } from './suppress-console-logs'

import { render, screen } from "@testing-library/svelte";
import type { Component, SvelteComponent } from "svelte";
import {
  assertActiveElement,
  assertDisabledish,
  assertLinkedWithDescription,
  assertLinkedWithLabel,
  getControl,
  getDescriptions,
  getLabel,
  getLabels,
} from "./accessibility-assertions";
import { click } from "./interactions";

function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

export function commonControlScenarios(Control: Component) {
  describe("Rendering composition", () => {
    describe("Inside `Field`", () => {
      it.skip("should mark the control as disabled, if the `Field` is disabled", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            let { Control } = $props()
          </script>
          <Field disabled>
            <Control />
          </Field>
        `);
        render(component, { Control });

        assertDisabledish(getControl());
      });

      it.skip("should link a control and a `Label` when inside a `Field`", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Label>My Label</Label>
            <Control />
          </Field>
        `);
        render(component, { Control });

        assertLinkedWithLabel(getControl(), getLabels());
      });

      it.skip("should link a control and multiple `Label` components when inside a `Field`", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Label>My Label #1</Label>
            <Label>My Label #2</Label>
            <Control />
          </Field>
        `);
        render(component, { Control });

        assertLinkedWithLabel(getControl(), getLabels());
      });

      it.skip("should link a control and a `Description` when inside a `Field`", async () => {
        const component = await sveltify(`
          <script>
            import Description from "$lib/description/Description.svelte";
            import Field from "$lib/field/Field.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Control />
            <Description>My Description</Description>
          </Field>
        `);
        render(component, { Control });

        assertLinkedWithDescription(getControl(), getDescriptions());
      });

      it.skip("should link a control and multiple `Description` components when inside a `Field`", async () => {
        const component = await sveltify(`
          <script>
            import Description from "$lib/description/Description.svelte";
            import Field from "$lib/field/Field.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Control />
            <Description>My Description #1</Description>
            <Description>My Description #2</Description>
            <Description>My Description #3</Description>
          </Field>
        `);
        render(component, { Control });

        assertLinkedWithDescription(getControl(), getDescriptions());
      });

      it.skip("should link a control with a `Label` and a `Description` when inside a `Field`", async () => {
        const component = await sveltify(`
          <script>
            import Description from "$lib/description/Description.svelte";
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Label>My Label</Label>
            <Control />
            <Description>My Description</Description>
          </Field>
        `);
        render(component, { Control });

        assertLinkedWithDescription(getControl(), getDescriptions());
        assertLinkedWithLabel(getControl(), getLabels());
      });
    });
  });

  describe("Mouse interactions", () => {
    describe("Inside `Field`", () => {
      it.skip("should be possible to click a `Label`, and focus the control when in a `Field`", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Label>My Label</Label>
            <Control />
          </Field>
        `);
        render(component, { Control });

        assertActiveElement(document.body);
        await click(getLabel());
        assertActiveElement(getControl());
      });

      it.skip("should not be possible to click a `Label`, if the `Label` has the `passive` prop", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Label passive>My Label</Label>
            <Control />
          </Field>
        `);
        render(component, { Control });

        assertActiveElement(document.body);
        await click(getLabel());
        assertActiveElement(document.body);
      });

      it.skip("should not be possible to click a `Label` and focus the control, if the control is disabled", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field>
            <Label>My Label</Label>
            <Control disabled />
          </Field>
        `);
        render(component, { Control });

        assertActiveElement(document.body);
        await click(getLabel());
        assertActiveElement(document.body);
      });

      it.skip("should not be possible to click a `Label` and focus the control, if the `Field` is disabled", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Field disabled>
            <Label>My Label</Label>
            <Control />
          </Field>
        `);
        render(component, { Control });

        assertActiveElement(document.body);
        await click(getLabel());
        assertActiveElement(document.body);
      });
    });

    describe("Inside `Fieldset`", () => {
      it("should not be possible to click a `Label` and focus the control, if the `Fieldset` is disabled", async () => {
        const component = await sveltify(`
          <script>
            import Field from "$lib/field/Field.svelte";
            import Fieldset from "$lib/fieldset/Fieldset.svelte";
            import Label from "$lib/label/Label.svelte";
            let { Control } = $props()
          </script>
          <Fieldset disabled>
            <Field>
              <Label>My Label</Label>
              <Control />
            </Field>
          </Fieldset>
        `);
        render(component, { Control });

        assertActiveElement(document.body);
        await click(getLabel());
        assertActiveElement(document.body);
      });
    });
  });
}

export function commonFormScenarios(
  Control: Component,
  {
    performUserInteraction,
  }: { performUserInteraction: (control: HTMLElement | null) => PromiseLike<void> },
) {
  describe("Form compatibility", () => {
    it("should render native (hidden) form elements for the control", async () => {
      const component = await sveltify(`
        <script>
          let { Control } = $props()
        </script>
        <form>
          <Control name="foo" />
        </form>
      `);
      render(component, { Control });

      expect(document.querySelector("[name=foo]")).toBeInTheDocument();
    });

    it.skip("should submit the form with all the data", async () => {
      let formDataMock = vi.fn();

      const component = await sveltify(`
        <script>
          let { Control } = $props()
        </script>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            formDataMock(new FormData(e.target as HTMLFormElement))
          }}
        >
          <Control name="foo" />
          <button>Submit</button>
        </form>
      `);
      render(component, { Control });

      // Submit form
      await click(screen.getByText("Submit"));

      // Ensure the form was submitted with the `foo` input present
      expect(formDataMock.mock.calls[0][0].has("foo")).toBe(true);
    });

    it.skip("should not submit the data if the control is disabled", async () => {
      let submits = vi.fn();

      const component = await sveltify(`
        <script>
          let { Control } = $props()
        </script>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            submits([...new FormData(event.currentTarget).entries()])
          }}
        >
          <input type="hidden" name="foo" value="bar" />
          <Control name="bar" disabled />
          <button>Submit</button>
        </form>
      `);
      render(component, { Control });

      // Submit the form
      await click(screen.getByText("Submit"));

      // Verify that the form has been submitted
      expect(submits).toHaveBeenLastCalledWith([
        ["foo", "bar"], // The only available field
      ]);
    });

    it.skip("should reset the control when the form is reset", async () => {
      let formDataMock = vi.fn();

      const component = await sveltify(`
          <script>
            let { Control } = $props()
          </script>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              formDataMock(new FormData(e.target as HTMLFormElement))
            }}
          >
            <Field>
              <Label>The Label</Label>
              <Control name="foo" />
            </Field>

            <button>Submit</button>
            <button type="reset">Reset</button>
          </form>
        `);
      render(component, { Control });

      // Submit the form to get the initial state of the form
      await click(screen.getByText("Submit"));
      let formState = Object.fromEntries(formDataMock.mock.calls[0][0]);

      // Make changes to the control
      await performUserInteraction(getControl());

      // Submit form
      await click(screen.getByText("Submit"));

      // Ensure the form was, and the values are different
      let newFormState = Object.fromEntries(formDataMock.mock.calls[1][0]);
      expect(newFormState).not.toEqual(formState);

      // Reset the form
      await click(screen.getByText("Reset"));

      // Ensure the form was reset
      await click(screen.getByText("Submit"));

      // Ensure the form state looks like the initial state
      let resetFormState = Object.fromEntries(formDataMock.mock.calls[2][0]);
      expect(resetFormState).toEqual(formState);
    });
  });
}

export function commonRenderingScenarios(
  Control: Component,
  { getElement }: { getElement: () => HTMLElement | null },
) {
  describe("Rendering", () => {
    it("should render a control", async () => {
      render(Control);

      expect(getElement()).toBeInTheDocument();
    });

    it("should have an `id` attached", () => {
      render(Control);

      expect(getElement()).toHaveAttribute("id");
    });

    it("should be possible to override the `id`", () => {
      render(Control, { id: "foo" });

      expect(getElement()).toHaveAttribute("id", "foo");
    });
  });
}
