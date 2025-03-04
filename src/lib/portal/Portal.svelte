<script lang="ts">
  import Fragment from "$lib/fragment/Fragment.svelte";
  /**
   * Since Portal isn't really an externally-facing API (at least, not explicitly) - writing it in a more naive Svelte-y way
   * for now, rather than porting the overly-complicated headlessui React version. Still aiming to keep the external API.
   */

  import { mount, type Snippet, unmount } from "svelte";

  type Props = {
    /** Whether or not the portal is enabled. */
    enabled?: boolean;
    /** The document hosting the portal. */
    ownerDocument?: Document | null;
    children?: Snippet<[Record<string, any>]>;
  };

  let {
    enabled = true,
    ownerDocument,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  $effect(() => {
    if (!enabled) {
      return;
    }

    const doc = ownerDocument ?? document;
    if (!doc) {
      console.log("Portal has no owner document");
      return;
    }
    let root = doc.getElementById("headlessui-portal-root");
    if (!root) {
      root = doc.createElement("div");
      root.setAttribute("id", "headlessui-portal-root");
      doc.body.appendChild(root);
    }

    let app = mount(Fragment, {
      target: root,
      props: { children },
    });

    return () => {
      if (app) {
        unmount(app);
      }

      if (root && root.childNodes.length <= 0) {
        root.parentElement?.removeChild(root);
      }
    };
  });
</script>

{#if !enabled}
  {@render children?.(theirProps)}
{/if}
