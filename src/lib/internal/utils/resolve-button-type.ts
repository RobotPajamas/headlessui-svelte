// MIT License

// Copyright (c) 2020 Tailwind Labs

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// https://github.com/tailwindlabs/headlessui
// https://raw.githubusercontent.com/tailwindlabs/headlessui/d71fb9cd2e12f5a48617b26e6bb3db90b3e07965/packages/%40headlessui-react/src/hooks/use-resolve-button-type.ts

// import { useMemo } from 'react'

// export function useResolveButtonType<TTag>(
//   props: { type?: string; as?: TTag },
//   element: HTMLElement | null
// ) {
//   return useMemo(() => {
//     // A type was provided
//     if (props.type) return props.type

//     // Resolve the type based on the `as` prop
//     let tag = props.as ?? 'button'
//     if (typeof tag === 'string' && tag.toLowerCase() === 'button') return 'button'

//     // Resolve the type based on the HTML element
//     if (element?.tagName === 'BUTTON' && !element.hasAttribute('type')) return 'button'

//     // Could not resolve the type
//     return undefined
//   }, [props.type, props.as, element])
// }

// TODO: Using older implementation right now - will port React version
export function resolveButtonType(
  props: { type?: string; as?: string },
  ref: HTMLElement | null | undefined,
): string | undefined {
  if (props.type) {
    return props.type;
  }
  const tag = props.as ?? "button";
  if (typeof tag === "string" && tag.toLowerCase() === "button") {
    return "button";
  }
  if (ref && ref instanceof HTMLButtonElement) {
    return "button";
  }
  return undefined;
}
