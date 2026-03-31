import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './routing';

const NAME_SPACES = [
  'common',
  'options',
  'auth',
  'home',

  'user/auth',
  'user/sign-up',
  'user/home',
  'user/profile',
  'user/information',
  'user/my-vehicle',
  'user/find-a-inspection',
  'user/inspection-detail',
  'user/reservation',
  'user/reservation-detail',

  'inspection/auth',
  'inspection/my-business',
  'inspection/service-management',
  'inspection/agency-coverage',

  'admin/inspection',
];

const loadNamespace = (locale: string, ns: string) =>
  import(`../messages/${locale}/${ns}.json`).then((m) => [ns, m.default]);

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  const messages = Object.fromEntries(await Promise.all(NAME_SPACES.map((ns) => loadNamespace(locale, ns))));

  return {
    locale,
    messages,
  };
});
