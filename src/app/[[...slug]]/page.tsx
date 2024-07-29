import { redirect } from "next/navigation";
import "../../index.css";
import { ClientOnly } from "./client";
import ErrorPage from "@/pages/404";

export function generateStaticParams() {
  return [{ slug: ["main"] }];
}

const Page = ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug || [];

  if (!slug || slug.length === 0) {
    redirect("/main");
  }

  if (slug[0] !== "main") {
    return <ErrorPage />;
  }

  return <ClientOnly />;
};

export default Page;
