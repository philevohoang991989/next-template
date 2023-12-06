import Header from "@/app/components/Header";
import { Layout } from "antd";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Layout>
      <Header />
      {children}
      </Layout>
    </section>
  );
}
