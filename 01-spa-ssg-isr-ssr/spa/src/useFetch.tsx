import { useEffect, useState } from "react";

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error?: unknown;
  }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetcher();

        setState({ data, loading: false });
      } catch (error) {
        setState({ data: null, loading: false, error });
      }
    })();
  }, [fetcher]);

  return state;
}
