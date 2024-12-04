<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import {} from "svelte/compiler";
  import { resolveButtonType } from "../../utils/resolve-button-type";

  type Props = {
    /** The element or component the Switch should render as. */
    as?: string | Component;
    /** Whether or not the switch is checked. */
    checked?: boolean;
    // defaultChecked?: boolean; // TODO: Unsure if we want this support
    /**
     * The id of the form that the switch belongs to.
     * If name is provided but form is not, the switch will add its state to the nearest ancestor form element.
     */
    form?: string;
    /** The name used when using the switch inside a form. */
    name?: string;
    /** The value used when using this component inside a form, if it is checked. */
    value?: string;
    id?: string;
    disabled?: boolean;
    tabIndex?: number;
    type?: string;
    children?: Snippet<[SnippetProps]>;
    // class?
  };

  /** The SnippetProps also live on the <Switch> component as data attributes (e.g. data-active, data-hover, ...) */
  type SnippetProps = {
    /** Whether or not the switch is in an active or pressed state. */
    active?: boolean;
    /** Whether or not the autofocus prop was set to true. */
    autofocus?: boolean;
    /**
     * Whether or not the checked state is currently changing.
     * When the checked state changes, changing will be true for two animation frames,
     * allowing you to fine-tune transitions.
     */
    changing?: boolean;
    /** Whether or not the switch is checked. */
    checked?: boolean;
    /** Whether or not the switch is disabled. */
    disabled?: boolean;
    /** Whether or not the switch is focused. */
    focus?: boolean;
    /** Whether or not the switch is hovered. */
    hover?: boolean;
  };

  let {
    as = "button",
    // checked = $bindable(false),
    checked = false,
    disabled = false,
    tabIndex = 0,
    type = undefined,
    children,
    ...theirProps
  }: Props & Record<string, any> = $props();

  function toggle() {
    checked = !checked;
  }

  function onclick(e: MouseEvent) {
    e.preventDefault();
    toggle();
  }

  function onkeyup(e: KeyboardEvent) {
    e.preventDefault();
    toggle();
  }

  // This is needed so that we can "cancel" the click event when we use the `Enter` key on a button.
  function onkeypress(e: KeyboardEvent) {
    e.preventDefault();
  }

  let ourProps = {
    role: "switch",
    tabindex: tabIndex === -1 ? 0 : tabIndex,
    type: resolveButtonType({ type, as }),
    "aria-checked": checked,
    // TODO: these
    // "aria-labelledby": labelledBy,
    // "aria-describedby": describedBy,
    // autoFocus,
    onclick,
    onkeypress,
    onkeyup,
  };

  let dataAttributes = {
    "data-active": false,
    "data-autofocus": false,
    "data-changing": false,
    "data-checked": checked,
    "data-disabled": disabled,
    "data-focus": false,
    "data-hover": false,
  };

  // TODO: Make these real values
  let snippetProps: SnippetProps = {
    active: false,
    autofocus: false,
    changing: false,
    checked: false,
    disabled: false,
    focus: false,
    hover: false,
  };
</script>

{#if typeof as === "string"}
  <svelte:element this={as} {...theirProps} {...ourProps} {...dataAttributes}>
    {@render children?.(snippetProps)}
  </svelte:element>
{:else}
  {@const Component = as}
  <Component {...theirProps} {...ourProps} {...dataAttributes}>
    {@render children?.(snippetProps)}
  </Component>
{/if}
