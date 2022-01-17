export function delay(delayTimeMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayTimeMs);
  });
}
