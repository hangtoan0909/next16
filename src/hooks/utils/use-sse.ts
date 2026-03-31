import { useEffect, useRef, useState } from 'react';

export interface SSEOptions<T> {
  onMessage?: (data: T) => void;
  onError?: (err: Event) => void;
  maxRetries?: number; // max number of retry attempts
  retryDelay?: number; // delay between retries (ms)
}

export const useSSE = <T>(url: string, options?: SSEOptions<T>) => {
  const [values, setValues] = useState<T[]>([]);
  const lastValueRef = useRef<T | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const isUnmountedRef = useRef(false);
  const retryCountRef = useRef(0);

  const connect = () => {
    if (!url || isUnmountedRef.current) return;

    const maxRetries = options?.maxRetries ?? 5;
    if (retryCountRef.current >= maxRetries) {
      console.warn(`[SSE] Exceeded maximum retry limit (${maxRetries}). Stopping reconnection.`);
      return;
    }

    // Close previous connection if any
    eventSourceRef.current?.close();

    const es = new EventSource(process.env.NEXT_PUBLIC_API_BASE_URL + url);
    eventSourceRef.current = es;

    es.onopen = () => {
      console.info('[SSE] Connected to:', url);
      retryCountRef.current = 0; // reset on successful connection
    };

    es.onmessage = (event: MessageEvent) => {
      let data: T;
      try {
        data = JSON.parse(event.data);
      } catch {
        data = event.data as T;
      }

      setValues((prev) => [...prev, data]);
      lastValueRef.current = data;
      options?.onMessage?.(data);
    };

    es.onerror = (err: Event) => {
      retryCountRef.current += 1;
      console.warn(`[SSE] Connection error #${retryCountRef.current}, attempting to reconnect...`, err);
      options?.onError?.(err);

      es.close();

      if (!isUnmountedRef.current && retryCountRef.current < maxRetries) {
        const delay = options?.retryDelay ?? 1000; // default 2 seconds
        setTimeout(connect, delay);
      } else if (retryCountRef.current >= maxRetries) {
        console.error('[SSE] Maximum retries reached. Reconnection stopped.');
      }
    };
  };

  useEffect(() => {
    isUnmountedRef.current = false;
    retryCountRef.current = 0;
    connect();

    return () => {
      isUnmountedRef.current = true;
      eventSourceRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    values,
    lastValue: lastValueRef.current,
    eventSource: eventSourceRef.current,
    retryCount: retryCountRef.current,
  };
};
