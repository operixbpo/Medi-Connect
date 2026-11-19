import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.home.title },
  description: pages.home.description,
};

export default function HomePage() {
  return <PreviewPage page={pages.home} />;
}
