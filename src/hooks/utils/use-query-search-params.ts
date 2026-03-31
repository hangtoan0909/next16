import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

type Options = {
  mode?: 'replace' | 'push';
};

export function useQueryKeys<const K extends string>(keys: readonly K[], options?: Options) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mode = options?.mode ?? 'replace';

  const queryString = searchParams.toString();

  const query = useMemo(() => {
    const result = {} as Record<K, string>;
    keys.forEach((k) => {
      result[k] = searchParams.get(k) ?? '';
    });
    return result;
  }, [keys, searchParams]);

  const setQuery = useCallback(
    (patch: Partial<Record<K, string>>) => {
      const params = new URLSearchParams(searchParams);

      (Object.keys(patch) as K[]).forEach((k) => {
        const value = patch[k];
        if (value === undefined) return; // keep current

        if (value === '') params.delete(k);
        else params.set(k, value);
      });

      const next = params.toString();
      if (next === queryString) return;

      const url = next ? `${pathname}?${next}` : pathname;
      if (mode === 'push') {
        router.push(url);
      } else {
        router.replace(url);
      }
    },
    [mode, pathname, queryString, router, searchParams]
  );

  const resetQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    keys.forEach((k) => params.delete(k));

    const next = params.toString();
    if (next === queryString) return;

    const url = next ? `${pathname}?${next}` : pathname;
    if (mode === 'push') {
      router.push(url);
    } else {
      router.replace(url);
    }
  }, [keys, mode, pathname, queryString, router, searchParams]);

  return { query, setQuery, resetQuery, queryString };
}
