import { render, screen } from "@testing-library/svelte";
import { getCheckbox } from "../../test-utils/accessibility-assertions";
import type { SvelteComponent } from "svelte";

function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

// TODO: Manually unrolled test-utils/scenarios.ts commonRenderingScenarios

describe("Rendering", () => {
  it("should render a checkbox", async () => {
    const component = await sveltify(`
      <script>
          import Checkbox from "$lib/checkbox/Checkbox.svelte";
      </script>
      <Checkbox />
    `);
    render(component);

    expect(getCheckbox()).toBeInTheDocument();
  });

  it("should have an `id` attached", async () => {
    const component = await sveltify(`
      <script>
          import Checkbox from "$lib/checkbox/Checkbox.svelte";
      </script>
      <Checkbox />
    `);
    render(component);

    expect(getCheckbox()).toHaveAttribute("id");
  });

  it("should be possible to override the `id`", async () => {
    const component = await sveltify(`
      <script>
          import Checkbox from "$lib/checkbox/Checkbox.svelte";
      </script>
      <Checkbox id="foo" />
    `);
    render(component);

    expect(getCheckbox()).toHaveAttribute("id", "foo");
  });
});

describe.skip("commonControlScenarios", () => {});
describe.skip("commonFormScenarios", () => {});

// describe.each([
//   [
//     'Uncontrolled',
//     function Example(props: CheckboxProps) {
//       return <Checkbox {...props} />
//     },
//   ],
//   [
//     'Controlled',
//     function Example(props: CheckboxProps) {
//       let [checked, setChecked] = useState(false)
//       return <Checkbox checked={checked} onChange={setChecked} {...props} />
//     },
//   ],
// ])('Keyboard interactions (%s)', (_, Example) => {
//   describe('`Space` key', () => {
//     it(
//       'should be possible to toggle a checkbox',
//       suppressConsoleLogs(async () => {
//         render(<Example />)

//         assertCheckbox({ state: CheckboxState.Unchecked })

//         await focus(getCheckbox())
//         await press(Keys.Space)

//         assertCheckbox({ state: CheckboxState.Checked })

//         await press(Keys.Space)

//         assertCheckbox({ state: CheckboxState.Unchecked })
//       })
//     )
//   })
// })

// describe.each([
//   [
//     'Uncontrolled',
//     function Example(props: CheckboxProps) {
//       return <Checkbox {...props} />
//     },
//   ],
//   [
//     'Controlled',
//     function Example(props: CheckboxProps) {
//       let [checked, setChecked] = useState(false)
//       return <Checkbox checked={checked} onChange={setChecked} {...props} />
//     },
//   ],
// ])('Mouse interactions (%s)', (_, Example) => {
//   it(
//     'should be possible to toggle a checkbox by clicking it',
//     suppressConsoleLogs(async () => {
//       render(<Example />)

//       assertCheckbox({ state: CheckboxState.Unchecked })

//       await click(getCheckbox())

//       assertCheckbox({ state: CheckboxState.Checked })

//       await click(getCheckbox())

//       assertCheckbox({ state: CheckboxState.Unchecked })
//     })
//   )
// })

// describe('Form submissions', () => {
//   it('should be possible to use in an uncontrolled way', async () => {
//     let handleSubmission = jest.fn()

//     render(
//       <form
//         onSubmit={(e) => {
//           e.preventDefault()
//           handleSubmission(Object.fromEntries(new FormData(e.target as HTMLFormElement)))
//         }}
//       >
//         <Checkbox name="notifications" />
//       </form>
//     )

//     let checkbox = document.querySelector('[id^="headlessui-checkbox-"]') as HTMLInputElement

//     // Focus the checkbox
//     await focus(checkbox)

//     // Submit
//     await press(Keys.Enter)

//     // No values
//     expect(handleSubmission).toHaveBeenLastCalledWith({})

//     // Toggle
//     await click(checkbox)

//     // Submit
//     await press(Keys.Enter)

//     // Notifications should be on
//     expect(handleSubmission).toHaveBeenLastCalledWith({ notifications: 'on' })

//     // Toggle
//     await click(checkbox)

//     // Submit
//     await press(Keys.Enter)

//     // Notifications should be off (or in this case, non-existent)
//     expect(handleSubmission).toHaveBeenLastCalledWith({})
//   })
// })
