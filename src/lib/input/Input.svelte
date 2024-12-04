<script lang="ts">
  import type { Component, Snippet } from "svelte";

  type Props = {
    /** The element or component the input should render as. */
    as?: string | Component;
    /** Whether or not the input should receive focus when first rendered. */
    autofocus?: boolean;
    /** Whether or not the input is disabled. */
    disabled?: boolean;
    /** Whether or not the input is invalid. */
    invalid?: boolean;
    children?: Snippet<[SnippetProps]>;
  };

  type SnippetProps = {
    /** Whether or not the autofocus prop was set to true. */
    autofocus?: boolean;
    /** Whether or not the input is invalid. */
    invalid?: boolean;
    /** Whether or not the input is disabled. */
    disabled?: boolean;
    /** Whether or not the input is focused. */
    focus?: boolean;
    /** Whether or not the input is hovered. */
    hover?: boolean;
  };

  let {
    as = "input",
    autofocus = false,
    disabled = false,
    invalid = false,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  let ourProps = {
    autofocus,
    disabled,
    "aria-invalid": invalid, // ? "" : undefined,
    // "aria-labelledby": labelledBy,
    // "aria-describedby": describedBy,
  };

  let dataAttributes = {
    "data-autofocus": autofocus,
    "data-disabled": disabled,
    "data-focus": invalid,
    "data-hover": invalid,
    "data-invalid": invalid,
  };

  let snippetProps: SnippetProps = {
    autofocus,
    disabled,
    focus: false,
    hover: false,
    invalid,
  };
</script>

<input {...theirProps} {...ourProps} {...dataAttributes} />
