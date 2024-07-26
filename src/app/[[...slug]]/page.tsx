import "../../index.css";
import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: ["main"] }, { slug: ["another-path"] }];
}

export default function Page() {
  return <ClientOnly />;
}
