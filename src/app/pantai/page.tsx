import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.pantai.title },
  description: pages.pantai.description,
};

export default function PantaiPage() {
  return <PreviewPage page={pages.pantai} />;
}
