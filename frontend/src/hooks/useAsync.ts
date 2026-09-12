import { useEffect, useRef, useState } from "react";

interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: string | undefined;
}

/** Runs `fetcher` whenever `deps` change and exposes { data, loading, error }. */
export function useAsync<T>(fetcher: () => Promise<T>, deps: React.DependencyList): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: undefined, loading: true, error: undefined });
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: undefined }));
    fetcherRef
      .current()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: undefined });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: undefined, loading: false, error: err.message });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
