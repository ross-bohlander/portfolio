// jsdom (the test DOM) doesn't implement ResizeObserver, but ngx-echarts
// requires one to exist. Charts aren't actually rendered in tests, so a
// no-op stub is enough to let component creation succeed.
/* eslint-disable @typescript-eslint/no-empty-function */
class MockResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
/* eslint-enable @typescript-eslint/no-empty-function */

export function installResizeObserverStub(): void {
  if (!('ResizeObserver' in globalThis)) {
    (globalThis as unknown as { ResizeObserver: typeof MockResizeObserver }).ResizeObserver =
      MockResizeObserver;
  }
}
