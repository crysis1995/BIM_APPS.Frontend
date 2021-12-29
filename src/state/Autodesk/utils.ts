export const timer = (timeDelay: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), timeDelay));
