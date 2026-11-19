import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.about.title },
  description: pages.about.description,
};

export default function AboutPage() {
  return <PreviewPage page={pages.about} />;
}
