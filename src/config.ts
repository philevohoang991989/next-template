import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "vi" as const;
export const locales = ["vi", "en"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  // '/pathnames': {
  //   en: '/pathnames',
  //   vi: '/pfadnamen'
  // }
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export type Locale = "vi" | "en";
export type AppConfig = {
  name: string;
  locales: Locale[];
  defaultLocale: Locale;
  localePrefix: LocalePrefix;
  timeZoneMap: Record<Locale, string>;
};
export const appConfig: AppConfig = {
  name: "Nextjs Starter",
  locales: ["vi","en"],
  defaultLocale: "vi",
  localePrefix,
  timeZoneMap: {
    vi: "Asia/Ho_Chi_Minh",
    en: "America/Los_Angeles",
  },
};
