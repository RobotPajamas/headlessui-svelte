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
// https://github.com/tailwindlabs/headlessui/blob/d71fb9cd2e12f5a48617b26e6bb3db90b3e07965/packages/%40headlessui-react/src/utils/match.ts

export function match<TValue extends string | number = string, TReturnValue = unknown>(
  value: TValue,
  lookup: Record<TValue, TReturnValue | ((...args: any[]) => TReturnValue)>,
  ...args: any[]
): TReturnValue {
  if (value in lookup) {
    let returnValue = lookup[value];
    return typeof returnValue === "function" ? returnValue(...args) : returnValue;
  }

  let error = new Error(
    `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${
      Object.keys(
        lookup,
      )
        .map((key) => `"${key}"`)
        .join(", ")
    }.`,
  );
  if (Error.captureStackTrace) Error.captureStackTrace(error, match);
  throw error;
}
