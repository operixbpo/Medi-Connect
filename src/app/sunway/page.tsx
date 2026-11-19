import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.sunway.title },
  description: pages.sunway.description,
};

export default function SunwayPage() {
  return <PreviewPage page={pages.sunway} />;
}
