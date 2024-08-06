import { redirect } from "next/navigation";
import "../../index.css";
import ErrorPage from "@app/not-found";
import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: ["main"] }];
}

const Page = ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug || [];

  if (!slug || slug.length === 0) {
    redirect("/main");
  }

  if (slug[1] !== "main") {
    return <ErrorPage />;
  }

  return <ClientOnly />;
};

export default Page;
