export const getQueryParams = (url: string): Record<string, string> => {
  const searchParams = new URLSearchParams(url);
  const record: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    record[key] = value;
  });
  return record;
};
