export const handleFetch = async <Data>(
  apiPath: string,
  query?: Record<string, any>
): Promise<Data> => {
  if (query && Object.values(query).length) {
    const parsedQuery = Object.entries(query)
      .reduce<string>(
        (prev, [key, value]) => prev + `${key}=${value}` + "&",
        "?"
      )
      .slice(0, -1);
    apiPath = apiPath + parsedQuery;
  }
  const res = await fetch(`${apiPath}`);
  if (!res.ok) {
    throw new Error("Error fetching to API");
  }
  return await res.json();
};
