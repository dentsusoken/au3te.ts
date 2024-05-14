export const getQueryParams = async (
  request: Request
): Promise<Record<string, string>> => {
  if (request.method === 'POST') {
    return searchParamsToRecord(new URLSearchParams(await request.text()));
  }

  return searchParamsToRecord(new URLSearchParams(new URL(request.url).search));
};

const searchParamsToRecord = (
  searchParams: URLSearchParams
): Record<string, string> => {
  const record: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    record[key] = value;
  });
  return record;
};
