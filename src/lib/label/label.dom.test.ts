import Label from "./Label.svelte";
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

it("empty", () => {
});

// it('should be possible to use a LabelProvider without using a Label', async () => {
//     function Component(props: { children: ReactNode }) {
//       let [labelledby, LabelProvider] = useLabels()

//       return (
//         <LabelProvider>
//           <div aria-labelledby={labelledby}>{props.children}</div>
//         </LabelProvider>
//       )
//     }

//     function Example() {
//       return <Component>No label</Component>
//     }

//     let { container } = render(<Example />)
//     expect(container.firstChild).toMatchSnapshot()
//   })

//   it('should be possible to use a LabelProvider and a single Label, and have them linked', async () => {
//     function Component(props: { children: ReactNode }) {
//       let [labelledby, LabelProvider] = useLabels()

//       return (
//         <LabelProvider>
//           <div aria-labelledby={labelledby}>{props.children}</div>
//         </LabelProvider>
//       )
//     }

//     function Example() {
//       return (
//         <Component>
//           <Label>I am a label</Label>
//           <span>Contents</span>
//         </Component>
//       )
//     }

//     let { container } = render(<Example />)
//     expect(container.firstChild).toMatchSnapshot()
//   })

//   it('should be possible to use a LabelProvider and multiple Label components, and have them linked', async () => {
//     function Component(props: { children: ReactNode }) {
//       let [labelledby, LabelProvider] = useLabels()

//       return (
//         <LabelProvider>
//           <div aria-labelledby={labelledby}>{props.children}</div>
//         </LabelProvider>
//       )
//     }

//     function Example() {
//       return (
//         <Component>
//           <Label>I am a label</Label>
//           <span>Contents</span>
//           <Label>I am also a label</Label>
//         </Component>
//       )
//     }

//     let { container } = render(<Example />)
//     expect(container.firstChild).toMatchSnapshot()
//   })
