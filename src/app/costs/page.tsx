import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.costs.title },
  description: pages.costs.description,
};

export default function CostsPage() {
  return <PreviewPage page={pages.costs} />;
}
