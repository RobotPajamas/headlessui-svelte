import type { Action, ActionReturn } from "svelte/action";

// TODO: For more sophistication, it's worth looking at react-aria to see all the press cases they handle in order to line up with headlessui

type ActionProps = {
  onPressStart: () => void;
  onPressEnd: () => void;
};

export const press: Action<Element, ActionProps> = (
  node: Element,
  { onPressStart, onPressEnd },
) => {
  // TODO: This does not correctly handle when you press and leave
  $effect(() => {
    node.addEventListener("pointerdown", onPressStart);
    node.addEventListener("pointerup", onPressEnd);
    node.addEventListener("pointercancel", onPressEnd);
    return () => {
      node.removeEventListener("pointerdown", onPressStart);
      node.removeEventListener("pointerup", onPressEnd);
      node.removeEventListener("pointercancel", onPressEnd);
    };
  });
};
