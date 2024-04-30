export const format = (format: string, ...args: unknown[]): string => {
  if ((format.match(/{}/g) || []).length !== args.length) {
    throw new Error(
      'The number of placeholders does not match the number of arguments.'
    );
  }

  args.map((v) => {
    format = format.replace(/{}/, `${v}`);
  });
  return format;
};
