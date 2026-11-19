import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.services.title },
  description: pages.services.description,
};

export default function ServicesPage() {
  return <PreviewPage page={pages.services} />;
}
