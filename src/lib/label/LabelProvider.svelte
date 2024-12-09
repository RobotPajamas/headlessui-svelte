<script module lang="ts">
  import { getContext, type Snippet } from "svelte";

  export type LabelContext = {
    name?: string;
    props?: object;
    labelIds?: string[];
    register: (value: string) => void;
  };

  export const LABEL_CONTEXT_NAME = Symbol("headlessui-label-context");
  export function useLabelContext(): LabelContext {
    const context = getContext<LabelContext>(LABEL_CONTEXT_NAME);
    if (!context) {
      throw new Error(
        "You used a <Label /> component, but it is not inside a relevant parent.",
      );
    }
    return context;
  }

  export function useLabelledBy(
    alwaysAvailableIds?: (string | undefined | null)[],
  ): string | undefined {
    const context = getContext<LabelContext>(LABEL_CONTEXT_NAME);
    console.log("useLabelledBy context is ", context);
    // if ((alwaysAvailableIds?.length ?? 0) > 0) {
    //     return [labelIds, ...alwaysAvailableIds!].filter(Boolean).join(" ");
    // }
    return context?.labelIds?.join(" ");
  }
</script>

<script lang="ts">
  import { setContext } from "svelte";

  type Props = {
    /** A name associated with this LabelProvider */
    name?: string;
    children?: Snippet;
    labelledBy?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    labelIds: string[];
  };

  let labelIds: string[] = $state([]);

  let { name, children, labelledBy, ...theirProps }: Props = $props();

  let context: LabelContext = {
    name,
    props: theirProps,
    labelIds,
    register,
  };
  setContext(LABEL_CONTEXT_NAME, context);

  function register(value: string) {
    labelIds.push(value); // = [...labelIds, value];
    return () => {
      labelIds.filter((labelId) => labelId !== value);
    };
  }
</script>

<!-- TODO: I hate this snippet children vs non-children naming convention so much -->
{@render children?.()}
{@render labelledBy?.({ labelIds })}
