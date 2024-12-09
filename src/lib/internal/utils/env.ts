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
// https://github.com/tailwindlabs/headlessui/blob/d71fb9cd2e12f5a48617b26e6bb3db90b3e07965/packages/%40headlessui-react/src/utils/env.ts

type RenderEnv = "client" | "server";
type HandoffState = "pending" | "complete";

class Env {
  current: RenderEnv = this.detect();
  handoffState: HandoffState = "pending";
  currentId = 0;

  set(env: RenderEnv): void {
    if (this.current === env) return;

    this.handoffState = "pending";
    this.currentId = 0;
    this.current = env;
  }

  reset(): void {
    this.set(this.detect());
  }

  nextId() {
    return ++this.currentId;
  }

  get isServer(): boolean {
    return this.current === "server";
  }

  get isClient(): boolean {
    return this.current === "client";
  }

  private detect(): RenderEnv {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return "server";
    }

    return "client";
  }

  handoff(): void {
    if (this.handoffState === "pending") {
      this.handoffState = "complete";
    }
  }

  get isHandoffComplete(): boolean {
    return this.handoffState === "complete";
  }
}

export let env = new Env();
