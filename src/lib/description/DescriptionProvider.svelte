<script module lang="ts">
  import { getContext, type Snippet } from "svelte";

  export type DescriptionContext = {
    name?: string;
    props?: object;
    descriptionIds?: string[];
    register: (value: string) => void;
  };

  export const DESCRIPTION_CONTEXT_NAME = Symbol(
    "headlessui-description-context",
  );
  export function useDescriptionContext(): DescriptionContext {
    const context = getContext<DescriptionContext>(DESCRIPTION_CONTEXT_NAME);
    if (!context) {
      throw new Error(
        "You used a <Description /> component, but it is not inside a relevant parent.",
      );
    }
    return context;
  }

  export function useDescribedBy(
    alwaysAvailableIds?: (string | undefined | null)[],
  ): string | undefined {
    const context = getContext<DescriptionContext>(DESCRIPTION_CONTEXT_NAME);
    // if ((alwaysAvailableIds?.length ?? 0) > 0) {
    //     return [labelIds, ...alwaysAvailableIds!].filter(Boolean).join(" ");
    // }
    return context?.descriptionIds?.join(" ");
  }
</script>

<script lang="ts">
  import { setContext } from "svelte";

  type Props = {
    /** A name associated with this LabelProvider */
    name?: string;
    children?: Snippet;
    describedBy?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    descriptionIds: string[];
  };

  let descriptionIds: string[] = $state([]);

  let { name, children, describedBy, ...theirProps }: Props = $props();

  let context: DescriptionContext = {
    name,
    props: theirProps,
    descriptionIds,
    register,
  };
  setContext(DESCRIPTION_CONTEXT_NAME, context);

  function register(value: string) {
    descriptionIds.push(value); // = [...labelIds, value];
    return () => {
      descriptionIds.filter((descriptionId) => descriptionId !== value);
    };
  }
</script>

<!-- TODO: I hate this snippet children vs non-children naming convention so much -->
{@render children?.()}
{@render describedBy?.({ descriptionIds })}
