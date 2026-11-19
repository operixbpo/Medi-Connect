import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.hospitals.title },
  description: pages.hospitals.description,
};

export default function HospitalsPage() {
  return <PreviewPage page={pages.hospitals} />;
}
