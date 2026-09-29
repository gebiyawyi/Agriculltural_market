import { useEffect, useState, useCallback } from "react";

export function useFetch(fetcher, deps = [], options = {}) {
  const { immediate = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      const message =
        err?.response?.data?.error || err?.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    if (immediate) run();
  }, [run, immediate]);

  return { data, loading, error, refetch: run };
}
