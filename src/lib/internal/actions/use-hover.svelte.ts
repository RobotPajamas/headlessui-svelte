import type { Action, ActionReturn } from "svelte/action";

// TODO: For more sophistication, it's worth looking at react-aria to see all the hover cases they handle in order to line up with headlessui

type ActionProps = {
  /** Callback for when the element is hovered */
  onHoverStart: () => void;
  /** Callback for when the element is no longer hovered */
  onHoverEnd: () => void;
};

/**
 * For the purpose of this library, the `hover` action simply calls the associated function callbacks.
 * It could also raise events, or apply data-attributes, however to stay as consistent with HeadlessUI-React's usage, we inform each component about
 * the hover state, and let the component decide how to action this information itself.
 */
export const hover: Action<Element, ActionProps> = (
  node: Element,
  { onHoverStart, onHoverEnd },
) => {
  $effect(() => {
    node.addEventListener("pointerenter", onHoverStart);
    node.addEventListener("pointerleave", onHoverEnd);
    return () => {
      node.removeEventListener("pointerenter", onHoverStart);
      node.removeEventListener("pointerleave", onHoverEnd);
    };
  });
};
