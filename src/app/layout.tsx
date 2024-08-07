import ClientLayout from "@components/client-layout/client-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Star Wars Characters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
