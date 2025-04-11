import Providers from '@/components/providers';
import { routing } from '@/i18n/routing';
import theme from "@/themes/themeConfig";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const messages = await getMessages();
    return (
        <html lang='en'>
            <body >
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <ConfigProvider theme={theme}>
                            <AntdRegistry>{children}</AntdRegistry>
                        </ConfigProvider>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}