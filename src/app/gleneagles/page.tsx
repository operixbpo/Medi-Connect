import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.gleneagles.title },
  description: pages.gleneagles.description,
};

export default function GleneaglesPage() {
  return <PreviewPage page={pages.gleneagles} />;
}
