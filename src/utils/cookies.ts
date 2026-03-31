import Cookies from 'js-cookie';

export const cookies = {
  get: (key: string): string | undefined => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return Cookies.get(key);
  },

  set: (key: string, value: string, options?: Cookies.CookieAttributes): void => {
    if (typeof window === 'undefined') return;
    Cookies.set(key, value, options);
  },

  remove: (key: string, options?: Cookies.CookieAttributes): void => {
    if (typeof window === 'undefined') return;
    Cookies.remove(key, options);
  },
};
