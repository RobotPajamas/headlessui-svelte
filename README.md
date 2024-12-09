# headlessui-svelte

This is an alpha port of [HeadlessUI](https://headlessui.com/) targeting Svelte 5 (or later).

A primary design goal is to stay as reasonably faithful to the HeadlessUI-React API as possible, in order to integrate better with [TailwindUI](https://tailwindui.com/). A secondary design goal is to align folder naming and tests, in order to reduce cognitive burden when porting and making updates.

This can manifest in strange, but intentional, ways:
- the existence of a `hooks` folder (not [SvelteKit hooks](https://svelte.dev/docs/kit/hooks))
- using test functions from the main headlessui repo, instead of the equivalent `testing-library` functionality
- the existence of a `Fragment` component
- ...

## Installation

```bash
npm install @robotpajamas/headlessui-svelte
```

## Documentation

Full documenation and examples will eventually live at [headlessui-svelte.com](headlessui-svelte.com)

## Progress

The target compatibility for the components below is based on [HeadlessUI React 2.2.0 (d71fb9c)](https://github.com/tailwindlabs/headlessui/tree/d71fb9cd2e12f5a48617b26e6bb3db90b3e07965). A component is considered completed when most of the mapped-over tests pass, and the component functions similarly to [headlessui.com](headlessui.com).

### Forms

- [/] Button
- [ ] Checkbox
- [ ] Combobox
- [ ] Description
- [ ] Field
- [ ] Fieldset
- [ ] Input
- [ ] Label
- [ ] Listbox
- [ ] Radio Group
- [ ] Select
- [ ] Switch
- [ ] Textarea

### Components

- [ ] Dropdown Menu
- [ ] Disclosure
- [ ] Dialog
- [ ] Popover
- [ ] Portal
- [ ] Tabs
- [ ] Transition

## Community

Other Svelte-based HeadlessUI implementations:

- CaptainCodeman: https://github.com/CaptainCodeman/svelte-headlessui
- rgossiaux: https://github.com/rgossiaux/svelte-headlessui

## License

This library is licensed under the MIT license; see the LICENSE file for more.
