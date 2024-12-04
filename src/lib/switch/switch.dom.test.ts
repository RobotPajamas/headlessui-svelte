import Switch from "./Switch.svelte";
import type { SvelteComponent } from "svelte";
import { render, screen } from "@testing-library/svelte";
import {
  assertActiveElement,
  assertSwitch,
  getByText,
  getSwitch,
  getSwitchLabel,
  SwitchState,
} from "../../test-utils/accessibility-assertions";
import { click, focus, Keys, mouseEnter, press } from "../../test-utils/interactions";

vi.mock("../../hooks/use-id");
function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

describe("Safe guards", async () => {
  it("should be possible to render a Switch without crashing", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
      </script>
      <Switch checked={false} onchange={console.log} />
    `);
    render(component);
  });
});

describe("Rendering", async () => {
  it("should be possible to render an (on) Switch using a render prop", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
      </script>
      <Switch checked={true} onchange={console.log}>
        {#snippet children(checked)}
          <span>{checked ? "On" : "Off"}</span>
        {/snippet}
      </Switch>
    `);
    render(component);

    assertSwitch({ state: SwitchState.On, textContent: "On" });
  });

  it("should be possible to render an (off) Switch using a render prop", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
      </script>
      <Switch checked={false} onchange={console.log}>
        {#snippet children({checked})}
          <span>{checked ? "On" : "Off"}</span>
        {/snippet}
      </Switch>
    `);
    render(component);

    assertSwitch({ state: SwitchState.Off, textContent: "Off" });
  });

  it("should be possible to render an (on) Switch using an `as` prop", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
      </script>
      <Switch as="span" checked={true} onchange={console.log} />
    `);
    render(component);

    assertSwitch({ state: SwitchState.On, tag: "span" });
  });

  it("should be possible to render an (off) Switch using an `as` prop", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
      </script>
      <Switch as="span" checked={false} onchange={console.log} />
    `);
    render(component);

    assertSwitch({ state: SwitchState.Off, tag: "span" });
  });

  it("should be possible to use the switch contents as the label", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
      </script>
      <Switch checked={false} onchange={console.log}>
        <span>Enable notifications</span>
      </Switch>
    `);
    render(component);

    assertSwitch({ state: SwitchState.Off, label: "Enable notifications" });
  });

  describe("`tabIndex` attribute", async () => {
    it("should have a default tabIndex of `0`", async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log}>
          <span>Enable notifications</span>
        </Switch>
      `);
      render(component);

      assertSwitch({
        state: SwitchState.Off,
        label: "Enable notifications",
        attributes: { tabindex: "0" },
      });
    });

    it("should be possible to override the `tabIndex`", async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log} tabIndex={3}>
          <span>Enable notifications</span>
        </Switch>
      `);
      render(component);

      assertSwitch({
        state: SwitchState.Off,
        label: "Enable notifications",
        attributes: { tabindex: "3" },
      });
    });

    it("should not be possible to override the `tabIndex` to `-1`", async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log} tabIndex={-1}>
          <span>Enable notifications</span>
        </Switch>
      `);
      render(component);

      assertSwitch({
        state: SwitchState.Off,
        label: "Enable notifications",
        attributes: { tabindex: "0" },
      });
    });
  });

  describe("`type` attribute", async () => {
    it('should set the `type` to "button" by default', async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log}>
          Trigger
        </Switch>
      `);
      render(component);

      expect(getSwitch()).toHaveAttribute("type", "button");
    });

    it('should not set the `type` to "button" if it already contains a `type`', async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log} type="submit">
          Trigger
        </Switch>
      `);
      render(component);

      expect(getSwitch()).toHaveAttribute("type", "submit");
    });

    it.skip('should set the `type` to "button" when using the `as` prop which resolves to a "button"', async () => {
      const component = await sveltify(`
        <script>
          // TODO: Pull from test-utils CustomButton
          import Button from "$lib/button/Button.svelte";
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log} as={Button}>
          Trigger
        </Switch>
      `);
      render(component);

      screen.debug();
      expect(getSwitch()).toHaveAttribute("type", "button");
    });

    it('should not set the type if the "as" prop is not a "button"', async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log} as="div">
          Trigger
        </Switch>
      `);
      render(component);

      expect(getSwitch()).not.toHaveAttribute("type");
    });

    it.skip('should not set the `type` to "button" when using the `as` prop which resolves to a "div"', async () => {
      const component = await sveltify(`
        <script>
          // TODO: Pull from test-utils CustomButton
          import Button from "$lib/button/Button.svelte";
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={console.log} as={Button}>
          Trigger
        </Switch>
      `);
      render(component);

      screen.debug();

      expect(getSwitch()).not.toHaveAttribute("type");
    });
  });

  describe("Uncontrolled", async () => {
    it.skip("should be possible to use in an uncontrolled way", async () => {
      let handleSubmission = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
          let { handleSubmission } = $props();
        </script>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            handleSubmission(Object.fromEntries(new FormData(e.target)));
          }}
        >
          <Switch name="notifications" />
          <button id="submit">submit</button>
        </form>
      `);
      render(component, { handleSubmission });

      await click(document.getElementById("submit"));

      // No values
      expect(handleSubmission).toHaveBeenLastCalledWith({});

      // Toggle
      await click(getSwitch());

      // Submit
      await click(document.getElementById("submit"));

      // Notifications should be on
      expect(handleSubmission).toHaveBeenLastCalledWith({ notifications: "on" });

      // Toggle
      await click(getSwitch());

      // Submit
      await click(document.getElementById("submit"));

      // Notifications should be off (or in this case, non-existent)
      expect(handleSubmission).toHaveBeenLastCalledWith({});
    });

    it.skip("should be possible to use in an uncontrolled way with a value", async () => {
      let handleSubmission = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            handleSubmission(Object.fromEntries(new FormData(e.target as HTMLFormElement)));
          }}
        >
          <Switch name="notifications" value="enabled" />
          <button id="submit">submit</button>
        </form>
      `);
      render(component);

      await click(document.getElementById("submit"));

      // No values
      expect(handleSubmission).toHaveBeenLastCalledWith({});

      // Toggle
      await click(getSwitch());

      // Submit
      await click(document.getElementById("submit"));

      // Notifications should be on
      expect(handleSubmission).toHaveBeenLastCalledWith({ notifications: "enabled" });

      // Toggle
      await click(getSwitch());

      // Submit
      await click(document.getElementById("submit"));

      // Notifications should be off (or in this case, non-existent)
      expect(handleSubmission).toHaveBeenLastCalledWith({});
    });

    it.skip("should be possible to provide a default value", async () => {
      let handleSubmission = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            handleSubmission(Object.fromEntries(new FormData(e.target as HTMLFormElement)));
          }}
        >
          <Switch name="notifications" defaultChecked />
          <button id="submit">submit</button>
        </form>
      `);
      render(component);

      await click(document.getElementById("submit"));

      // Notifications should be on by default
      expect(handleSubmission).toHaveBeenLastCalledWith({ notifications: "on" });

      // Toggle
      await click(getSwitch());

      // Submit
      await click(document.getElementById("submit"));

      // Notifications should be off (or in this case non-existent)
      expect(handleSubmission).toHaveBeenLastCalledWith({});
    });

    it.skip("should be possible to reset to the default value if the form is reset", async () => {
      let handleSubmission = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            handleSubmission(Object.fromEntries(new FormData(e.target as HTMLFormElement)));
          }}
        >
          <Switch name="assignee" value="bob" defaultChecked />
          <button id="submit">submit</button>
          <button type="reset" id="reset">
            reset
          </button>
        </form>
      `);
      render(component);

      // Bob is the defaultValue
      await click(document.getElementById("submit"));
      expect(handleSubmission).toHaveBeenLastCalledWith({ assignee: "bob" });

      // Toggle the switch
      await click(getSwitch());

      // Bob should not be active anymore
      await click(document.getElementById("submit"));
      expect(handleSubmission).toHaveBeenLastCalledWith({});

      // Reset
      await click(document.getElementById("reset"));

      // Bob should be submitted again
      await click(document.getElementById("submit"));
      expect(handleSubmission).toHaveBeenLastCalledWith({ assignee: "bob" });
    });

    it.skip("should still call the onChange listeners when choosing new values", async () => {
      let handleChange = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch name="notifications" onchange={handleChange} />
      `);
      render(component);

      // Toggle
      await click(getSwitch());

      // Toggle
      await click(getSwitch());

      // Toggle
      await click(getSwitch());

      // Change handler should have been called 3 times
      expect(handleChange).toHaveBeenNthCalledWith(1, true);
      expect(handleChange).toHaveBeenNthCalledWith(2, false);
      expect(handleChange).toHaveBeenNthCalledWith(3, true);
    });
  });
});

describe("Render composition", async () => {
  it.skip("should be possible to render a Switch.Group, Switch and Switch.Label", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
      </script>
      <SwitchGroup>
        <Switch checked={false} onchange={console.log} />
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchGroup>
    `);
    render(component);

    assertSwitch({ state: SwitchState.Off, label: "Enable notifications" });
  });

  it.skip("should be possible to render a Switch.Group, Switch and Switch.Label (before the Switch)", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
      </script>
      <SwitchGroup>
        <SwitchLabel>Label B</SwitchLabel>
        <Switch checked={false} onchange={console.log}>
          Label A
        </Switch>
      </SwitchGroup>
    `);
    render(component);

    // Warning! Using aria-label or aria-labelledby will hide any descendant content from assistive
    // technologies.
    //
    // Thus: Label A should not be part of the "label" in this case
    assertSwitch({ state: SwitchState.Off, label: "Label B" });
  });

  it.skip("should be possible to render a Switch.Group, Switch and Switch.Label (after the Switch)", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
      </script>
      <SwitchGroup>
        <Switch checked={false} onchange={console.log}>
          Label A
        </Switch>
        <SwitchLabel>Label B</SwitchLabel>
      </SwitchGroup>
    `);
    render(component);

    // Warning! Using aria-label or aria-labelledby will hide any descendant content from assistive
    // technologies.
    //
    // Thus: Label A should not be part of the "label" in this case
    assertSwitch({ state: SwitchState.Off, label: "Label B" });
  });

  it.skip("should be possible to render a Switch.Group, Switch and Switch.Description (before the Switch)", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchDescription from "$lib/switch/SwitchDescription.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
      </script>
      <SwitchGroup>
        <SwitchDescription>This is an important feature</SwitchDescription>
        <Switch checked={false} onchange={console.log} />
      </SwitchGroup>
    `);
    render(component);

    assertSwitch({ state: SwitchState.Off, description: "This is an important feature" });
  });

  it.skip("should be possible to render a Switch.Group, Switch and Switch.Description (after the Switch)", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchDescription from "$lib/switch/SwitchDescription.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
      </script>
      <SwitchGroup>
        <Switch checked={false} onchange={console.log} />
        <SwitchDescription>This is an important feature</SwitchDescription>
      </SwitchGroup>
    `);
    render(component);

    assertSwitch({ state: SwitchState.Off, description: "This is an important feature" });
  });

  it.skip("should be possible to render a Switch.Group, Switch, Switch.Label and Switch.Description", async () => {
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchDescription from "$lib/switch/SwitchDescription.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
      </script>
      <SwitchGroup>
        <SwitchLabel>Label A</SwitchLabel>
        <Switch checked={false} onchange={console.log} />
        <SwitchDescription>This is an important feature</SwitchDescription>
      </SwitchGroup>
    `);
    render(component);

    assertSwitch({
      state: SwitchState.Off,
      label: "Label A",
      description: "This is an important feature",
    });
  });
});

describe.skip("Keyboard interactions", async () => {
  describe("`Space` key", async () => {
    it("should be possible to toggle the Switch with Space", async () => {
      let handleChange = vi.fn();
      const component = await sveltify(`
        <script>
          let state = $state(false);
        </script>
        checked={state}
        onchange={
          (value) => {
            ((v) => state = v(value));
            handleChange(value);
          }
        }
      `);
      render(component);

      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off });

      // Focus the switch
      await focus(getSwitch());

      // Toggle
      await press(Keys.Space);

      // Ensure state is on
      assertSwitch({ state: SwitchState.On });

      // Toggle
      await press(Keys.Space);

      // Ensure state is off
      assertSwitch({ state: SwitchState.Off });
    });
  });

  describe("`Enter` key", async () => {
    it("should not be possible to use Enter to toggle the Switch", async () => {
      let handleChange = vi.fn();
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <Switch checked={false} onchange={handleChange} />
      `);
      render(component);

      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off });

      // Focus the switch
      await focus(getSwitch());

      // Try to toggle
      await press(Keys.Enter);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should submit the form on `Enter`", async () => {
      let submits = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
          let value = $state(true);
        </script>
        onsubmit={
          (event) => {
            event.preventDefault();
            submits([...new FormData(event.currentTarget).entries()]);
          }
        }
        >
        <Switch checked={value} onchange={(v) => value = v} name="option" />
        <button>Submit</button>
      `);
      render(component);

      // Focus the input field
      await focus(getSwitch());
      assertActiveElement(getSwitch());

      // Press enter (which should submit the form)
      await press(Keys.Enter);

      // Verify the form was submitted
      expect(submits).toHaveBeenCalledTimes(1);
      expect(submits).toHaveBeenCalledWith([["option", "on"]]);
    });

    it("should submit the form on `Enter` (when no submit button was found)", async () => {
      let submits = vi.fn();

      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
          let value = $state(true);
        </script>
        onsubmit={
          (event) => {
            event.preventDefault();
            submits([...new FormData(event.currentTarget).entries()]);
          }
        }
        >
        <Switch checked={value} onchange={(v) => value = v} name="option" />
      `);
      render(component);

      // Focus the input field
      await focus(getSwitch());
      assertActiveElement(getSwitch());

      // Press enter (which should submit the form)
      await press(Keys.Enter);

      // Verify the form was submitted
      expect(submits).toHaveBeenCalledTimes(1);
      expect(submits).toHaveBeenCalledWith([["option", "on"]]);
    });
  });

  describe("`Tab` key", async () => {
    it("should be possible to tab away from the Switch", async () => {
      const component = await sveltify(`
        <script>
          import Switch from "$lib/switch/Switch.svelte";
        </script>
        <div>
          <Switch checked={false} onchange={console.log} />
          <button id="btn">Other element</button>
        </div>
      `);
      render(component);

      // Ensure checkbox is off
      assertSwitch({ state: SwitchState.Off });

      // Focus the switch
      await focus(getSwitch());

      // Expect the switch to be active
      assertActiveElement(getSwitch());

      // Toggle
      await press(Keys.Tab);

      // Expect the button to be active
      assertActiveElement(document.getElementById("btn"));
    });
  });
});

describe.skip("Mouse interactions", async () => {
  it("should be possible to toggle the Switch with a click", async () => {
    let handleChange = vi.fn();
    const component = await sveltify(`
      <script>
        let state = $state(false);
      </script>
      checked={state}
      onchange={
        (value) => {
          ((v) => state = v(value));
          handleChange(value);
        }
      }
    `);
    render(component);

    // Ensure checkbox is off
    assertSwitch({ state: SwitchState.Off });

    // Toggle
    await click(getSwitch());

    // Ensure state is on
    assertSwitch({ state: SwitchState.On });

    // Toggle
    await click(getSwitch());

    // Ensure state is off
    assertSwitch({ state: SwitchState.Off });
  });

  it("should be possible to toggle the Switch with a click on the Label", async () => {
    let handleChange = vi.fn();
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
        let state = $state(false);
      </script>
      <Switch
        checked={state}
        onchange={(value) => {
          ((v) => state = v(value));
          handleChange(value);
        }}
      />
      <SwitchLabel>The label</SwitchLabel>
    `);
    render(component);

    // Ensure checkbox is off
    assertSwitch({ state: SwitchState.Off });

    // Toggle
    await click(getSwitchLabel());

    // Ensure the switch is focused
    assertActiveElement(getSwitch());

    // Ensure state is on
    assertSwitch({ state: SwitchState.On });

    // Toggle
    await click(getSwitchLabel());

    // Ensure the switch is focused
    assertActiveElement(getSwitch());

    // Ensure state is off
    assertSwitch({ state: SwitchState.Off });
  });

  it("should not be possible to toggle the Switch with a click on the Label (passive)", async () => {
    let handleChange = vi.fn();
    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
        let state = $state(false);
      </script>
      <Switch
        checked={state}
        onchange={(value) => {
          ((v) => state = v(value));
          handleChange(value);
        }}
      />
      <SwitchLabel passive>The label</SwitchLabel>
    `);
    render(component);

    // Ensure checkbox is off
    assertSwitch({ state: SwitchState.Off });

    // Toggle
    await click(getSwitchLabel());

    // Ensure state is still off
    assertSwitch({ state: SwitchState.Off });
  });

  //   xit('should be possible to hover the label and trigger a hover on the switch', async () => {
  //     // This test doesn't work in JSDOM :(
  //     // Keeping it here for reference when we can test this in a real browser
  //     function Example() {
  //       let [state] = useState(false)
  //       return (
  //         <Switch.Group>
  //           <style>{`.bg{background-color:rgba(0,255,0)}.bg-on-hover:hover{background-color:rgba(255,0,0)}`}</style>
  //           <Switch checked={state} className="bg bg-on-hover" />
  //           <Switch.Label>The label</Switch.Label>
  //         </Switch.Group>
  //       )
  //     }

  //     // Verify the switch is not hovered
  //     expect(window.getComputedStyle(getSwitch()!).backgroundColor).toBe('rgb(0, 255, 0)')

  //     // Hover over the *label*
  //     await mouseEnter(getSwitchLabel())

  //     // Make sure the switch gets hover styles
  //     expect(window.getComputedStyle(getSwitch()!).backgroundColor).toBe('rgb(255, 0, 0)')
  //   })
});

describe.skip("Form compatibility", async () => {
  it("should be possible to set the `form`, which is forwarded to the hidden inputs", async () => {
    let submits = vi.fn();

    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
        let state = $state(false);
      </script>
      <SwitchGroup>
        <Switch form="my-form" checked={state} onchange={(v) => state = v} name="notifications" />
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchGroup>

      <form
        id="my-form"
        onsubmit={(event) => {
          event.preventDefault();
          submits([...new FormData(event.currentTarget).entries()]);
        }}
      >
        <button>Submit</button>
      </form>
    `);
    render(component);

    // Toggle
    await click(getSwitchLabel());

    // Submit the form again
    await click(getByText("Submit"));

    // Verify that the form has been submitted
    expect(submits).toHaveBeenLastCalledWith([["notifications", "on"]]);
  });

  it("should be possible to submit a form with an boolean value", async () => {
    let submits = vi.fn();

    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
        let state = $state(false);
      </script>
      onsubmit={
        (event) => {
          event.preventDefault();
          submits([...new FormData(event.currentTarget).entries()]);
        }
      }
      >
      <SwitchGroup>
        <Switch checked={state} onchange={(v) => state = v} name="notifications" />
        <SwitchLabel>Enable notifications</SwitchLabel>
      </SwitchGroup>
      <button>Submit</button>
    `);
    render(component);

    // Submit the form
    await click(getByText("Submit"));

    // Verify that the form has been submitted
    expect(submits).toHaveBeenLastCalledWith([]); // no data

    // Toggle
    await click(getSwitchLabel());

    // Submit the form again
    await click(getByText("Submit"));

    // Verify that the form has been submitted
    expect(submits).toHaveBeenLastCalledWith([["notifications", "on"]]);
  });

  it("should be possible to submit a form with a provided string value", async () => {
    let submits = vi.fn();

    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
        let state = $state(false);
      </script>
      onsubmit={
        (event) => {
          event.preventDefault();
          submits([...new FormData(event.currentTarget).entries()]);
        }
      }
      >
      <SwitchGroup>
        <Switch checked={state} onchange={(v) => state = v} name="fruit" value="apple" />
        <SwitchLabel>Apple</SwitchLabel>
      </SwitchGroup>
      <button>Submit</button>
   `);
    render(component);

    // Submit the form
    await click(getByText("Submit"));

    // Verify that the form has been submitted
    expect(submits).toHaveBeenLastCalledWith([]); // no data

    // Toggle
    await click(getSwitchLabel());

    // Submit the form again
    await click(getByText("Submit"));

    // Verify that the form has been submitted
    expect(submits).toHaveBeenLastCalledWith([["fruit", "apple"]]);
  });

  it("should not submit the data if the Switch is disabled", async () => {
    let submits = vi.fn();

    const component = await sveltify(`
      <script>
        import Switch from "$lib/switch/Switch.svelte";
        import SwitchGroup from "$lib/switch/SwitchGroup.svelte";
        import SwitchLabel from "$lib/switch/SwitchLabel.svelte";
        let state = $state(true);
      </script>
      onsubmit={
        (event) => {
          event.preventDefault();
          submits([...new FormData(event.currentTarget).entries()]);
        }
      }
      >
      <input type="hidden" name="foo" value="bar" />
      <SwitchGroup>
        <Switch checked={state} onchange={(v) => state = v} name="fruit" value="apple" disabled />
        <SwitchLabel>Apple</SwitchLabel>
      </SwitchGroup>
      <button>Submit</button>
    `);
    render(component);

    // Submit the form
    await click(getByText("Submit"));

    // Verify that the form has been submitted
    expect(submits).toHaveBeenLastCalledWith([
      ["foo", "bar"], // The only available field
    ]);
  });
});
