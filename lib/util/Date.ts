export const fromMilliseconds = (ms: unknown): Date => {
  if (typeof ms !== 'number') {
    throw new Error('Invalid argument');
  }
  return new Date(ms);
};
