import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.whyMalaysia.title },
  description: pages.whyMalaysia.description,
};

export default function WhyMalaysiaPage() {
  return <PreviewPage page={pages.whyMalaysia} />;
}
