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
        <div id="root">{children}</div>
        {/* <script type="module" src="/src/pages/_app.tsx"></script> */}
      </body>
    </html>
  );
}
