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
// https://github.com/tailwindlabs/headlessui/blob/d71fb9cd2e12f5a48617b26e6bb3db90b3e07965/packages/%40headlessui-react/src/test-utils/fake-pointer.ts

export class FakePointer {
  private x: number = 0;
  private y: number = 0;

  constructor(
    private width: number,
    private height: number,
  ) {
    this.width = width;
    this.height = height;
  }

  get options() {
    return {
      screenX: this.x,
      screenY: this.y,
    };
  }

  randomize() {
    this.x = Math.floor(Math.random() * this.width);
    this.y = Math.floor(Math.random() * this.height);
  }

  advance(amount: number = 1) {
    this.x += amount;

    if (this.x >= this.width) {
      this.x %= this.width;
      this.y++;
    }

    if (this.y >= this.height) {
      this.y %= this.height;
    }
  }

  /**
   * JSDOM does not support pointer events.
   * Because of this when we try to set the pointer position it returns undefined so our checks fail.
   *
   * This runs the callback with the TEST_IGNORE_TRACKED_POINTER environment variable set to 1 so we bypass the checks.
   */
  bypassingTrackingChecks(callback: () => void) {
    let original = process.env.TEST_BYPASS_TRACKED_POINTER;
    process.env.TEST_BYPASS_TRACKED_POINTER = "1";
    callback();
    process.env.TEST_BYPASS_TRACKED_POINTER = original;
  }
}

/**
 * A global pointer for use in pointer and mouse event checks
 */
export let pointer = new FakePointer(1920, 1080);
