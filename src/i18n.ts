import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Locale, appConfig, locales } from "./config";
 

export default getRequestConfig(async ({ locale }) => {
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
  const timeZone = appConfig.timeZoneMap[locale as Locale] || "UTC"; // Sử dụng UTC hoặc giá trị mặc định nếu không tìm thấy
  console.log({ timeZone });
  const messages = await import(
    `../messages/${locale === "vi" ? "vi" : locale}.json`
  ).then((mod) => mod.default);
  return {
    messages: (
      await (locale === "vi"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../messages/vi.json")
        : import(`../messages/${locale}.json`))
    ).default,
    timeZone,
  };
});
