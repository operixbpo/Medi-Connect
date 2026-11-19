import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.journey.title },
  description: pages.journey.description,
};

export default function JourneyPage() {
  return <PreviewPage page={pages.journey} />;
}
