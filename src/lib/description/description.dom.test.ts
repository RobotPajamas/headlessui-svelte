import Description from "./Description.svelte";
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

// it('should be possible to use a DescriptionProvider without using a Description', async () => {
//     function Component(props: { children: ReactNode }) {
//       let [describedby, DescriptionProvider] = useDescriptions()

//       return (
//         <DescriptionProvider>
//           <div aria-describedby={describedby}>{props.children}</div>
//         </DescriptionProvider>
//       )
//     }

//     function Example() {
//       return <Component>No description</Component>
//     }

//     let { container } = render(<Example />)
//     expect(container.firstChild).toMatchSnapshot()
//   })

//   it('should be possible to use a DescriptionProvider and a single Description, and have them linked', async () => {
//     function Component(props: { children: ReactNode }) {
//       let [describedby, DescriptionProvider] = useDescriptions()

//       return (
//         <DescriptionProvider>
//           <div aria-describedby={describedby}>{props.children}</div>
//         </DescriptionProvider>
//       )
//     }

//     function Example() {
//       return (
//         <Component>
//           <Description>I am a description</Description>
//           <span>Contents</span>
//         </Component>
//       )
//     }

//     let { container } = render(<Example />)
//     expect(container.firstChild).toMatchSnapshot()
//   })

//   it('should be possible to use a DescriptionProvider and multiple Description components, and have them linked', async () => {
//     function Component(props: { children: ReactNode }) {
//       let [describedby, DescriptionProvider] = useDescriptions()

//       return (
//         <DescriptionProvider>
//           <div aria-describedby={describedby}>{props.children}</div>
//         </DescriptionProvider>
//       )
//     }

//     function Example() {
//       return (
//         <Component>
//           <Description>I am a description</Description>
//           <span>Contents</span>
//           <Description>I am also a description</Description>
//         </Component>
//       )
//     }

//     let { container } = render(<Example />)
//     expect(container.firstChild).toMatchSnapshot()
//   })
