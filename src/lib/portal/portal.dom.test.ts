import type { SvelteComponent } from "svelte";
import { render } from "@testing-library/svelte";
import { click } from "../../test-utils/interactions";

function sveltify(input: string): Promise<typeof SvelteComponent> {
  throw new Error("TODO");
}

function getPortalRoot() {
  return document.getElementById("headlessui-portal-root")!;
}

// beforeEach(() => {
//   document.body.innerHTML = "";
// });

it("should be possible to use a Portal", async () => {
  expect(getPortalRoot()).toBe(null);

  const component = await sveltify(`
    <script>
      import Portal from "$lib/portal/Portal.svelte";
    </script>
    <main id="parent">
      <Portal>
        <p id="content">Contents...</p>
      </Portal>
    </main>
`);
  render(component);

  let parent = document.getElementById("parent");
  let content = document.getElementById("content");

  expect(getPortalRoot()).not.toBe(null);

  // Ensure the content is not part of the parent
  expect(parent).not.toContainElement(content);

  // Ensure the content does exist
  expect(content).not.toBe(null);
  expect(content).toHaveTextContent("Contents...");
});

it("should be possible to use multiple Portal elements", async () => {
  expect(getPortalRoot()).toBe(null);

  const component = await sveltify(`
    <script>
      import Portal from "$lib/portal/Portal.svelte";
    </script>
    <main id="parent">
      <Portal>
        <p id="content1">Contents 1 ...</p>
      </Portal>
      <hr />
      <Portal>
        <p id="content2">Contents 2 ...</p>
      </Portal>
    </main>
`);
  render(component);

  let parent = document.getElementById("parent");
  let content1 = document.getElementById("content1");
  let content2 = document.getElementById("content2");

  expect(getPortalRoot()).not.toBe(null);

  // Ensure the content1 is not part of the parent
  expect(parent).not.toContainElement(content1);

  // Ensure the content2 is not part of the parent
  expect(parent).not.toContainElement(content2);

  // Ensure the content does exist
  expect(content1).not.toBe(null);
  expect(content1).toHaveTextContent("Contents 1 ...");

  // Ensure the content does exist
  expect(content2).not.toBe(null);
  expect(content2).toHaveTextContent("Contents 2 ...");
});

it("should cleanup the Portal root when the last Portal is unmounted", async () => {
  expect(getPortalRoot()).toBe(null);

  const component = await sveltify(`
    <script>
      import Portal from "$lib/portal/Portal.svelte";
      let renderA = $state(false);
      let renderB = $state(false);
    </script>
    <main id="parent">
      <button id="a" onclick={() => renderA = !renderA}>
        Toggle A
      </button>
      <button id="b" onclick={() => renderB = !renderB}>
        Toggle B
      </button>

      {#if renderA}
        <Portal>
          <p id="content1">Contents 1 ...</p>
        </Portal>
      {/if}

      {#if renderB}
        <Portal>
          <p id="content2">Contents 2 ...</p>
        </Portal>
      {/if}
    </main>
`);
  render(component);

  let a = document.getElementById("a");
  let b = document.getElementById("b");

  expect(getPortalRoot()).toBe(null);

  // Let's render the first Portal
  await click(a);

  expect(getPortalRoot()).not.toBe(null);
  expect(getPortalRoot().children).toHaveLength(1);

  // Let's render the second Portal
  await click(b);

  expect(getPortalRoot()).not.toBe(null);
  expect(getPortalRoot().children).toHaveLength(2);

  // Let's remove the first portal
  await click(a);

  expect(getPortalRoot()).not.toBe(null);
  expect(getPortalRoot().children).toHaveLength(1);

  // Let's remove the second Portal
  await click(b);

  expect(getPortalRoot()).toBe(null);

  // Let's render the first Portal again
  await click(a);

  expect(getPortalRoot()).not.toBe(null);
  expect(getPortalRoot().children).toHaveLength(1);
});

it("should be possible to render multiple portals at the same time", async () => {
  expect(getPortalRoot()).toBe(null);

  const component = await sveltify(`
    <script>
        import Portal from "$lib/portal/Portal.svelte";
        let renderA = $state(true);
        let renderB = $state(true);
        let renderC = $state(true);
    </script>
    <main id="parent">
        <button id="a" onclick={() => renderA = !renderA}>
          Toggle A
        </button>
        <button id="b" onclick={() => renderB = !renderB}>
          Toggle B
        </button>
        <button id="c" onclick={() => renderC = !renderC}>
          Toggle C
        </button>

        <button
          id="double"
          onclick={() => {
            renderA = !renderA;
            renderB = !renderB;
          }}
        >
          Toggle A & B{' '}
        </button>

      {#if renderA}
        <Portal>
          <p id="content1">Contents 1 ...</p>
        </Portal>
      {/if}

      {#if renderB}
        <Portal>
          <p id="content2">Contents 2 ...</p>
        </Portal>
      {/if}

      {#if renderC}
        <Portal>
          <p id="content3">Contents 3 ...</p>
        </Portal>
      {/if}
    </main>`);
  render(component);

  expect(getPortalRoot()).not.toBe(null);
  expect(getPortalRoot().children).toHaveLength(3);

  // Remove Portal 1
  await click(document.getElementById("a"));
  expect(getPortalRoot().children).toHaveLength(2);

  // Remove Portal 2
  await click(document.getElementById("b"));
  expect(getPortalRoot().children).toHaveLength(1);

  // Re-add Portal 1
  await click(document.getElementById("a"));
  expect(getPortalRoot().children).toHaveLength(2);

  // Remove Portal 3
  await click(document.getElementById("c"));
  expect(getPortalRoot().children).toHaveLength(1);

  // Remove Portal 1
  await click(document.getElementById("a"));
  expect(getPortalRoot()).toBe(null);

  // Render A and B at the same time!
  await click(document.getElementById("double"));
  expect(getPortalRoot().children).toHaveLength(2);
});

it("should be possible to tamper with the modal root and restore correctly", async () => {
  expect(getPortalRoot()).toBe(null);

  const component = await sveltify(`
    <script>
      import Portal from "$lib/portal/Portal.svelte";
      let renderA = $state(true);
      let renderB = $state(true);
    </script>
    <main id="parent">
      <button id="a" onclick={() => renderA = !renderA}>
        Toggle A
      </button>
      <button id="b" onclick={() => renderB = !renderB}>
        Toggle B
      </button>

      {#if renderA}
        <Portal>
          <p id="content1">Contents 1 ...</p>
        </Portal>
      {/if}

      {#if renderB}
        <Portal>
          <p id="content2">Contents 2 ...</p>
        </Portal>
      {/if}
    </main>
`);
  render(component);

  expect(getPortalRoot()).not.toBe(null);

  // Tamper tamper
  document.body.removeChild(document.getElementById("headlessui-portal-root")!);

  // Hide Portal 1 and 2
  await click(document.getElementById("a"));
  await click(document.getElementById("b"));

  expect(getPortalRoot()).toBe(null);

  // Re-show Portal 1 and 2
  await click(document.getElementById("a"));
  await click(document.getElementById("b"));

  expect(getPortalRoot()).not.toBe(null);
  expect(getPortalRoot().children).toHaveLength(2);
});

it.skip("should be possible to force the Portal into a specific element using PortalGroup", async () => {
  const component = await sveltify(`
    <script>
      import Portal from "$lib/portal/Portal.svelte";
      import PortalGroup from "$lib/portal/PortalGroup.svelte";
    </script>
    <main>
      <aside ref={container} id="group-1">
        A
      </aside>

      <PortalGroup target={container}>
        <section id="group-2">
          <span>B</span>
        </section>
        <Portal>Next to A</Portal>
      </PortalGroup>

      <Portal>I am in the portal root</Portal>
    </main>
`);
  render(component);

  expect(document.body.innerHTML).toMatchSnapshot();
});
