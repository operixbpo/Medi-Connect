import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.contact.title },
  description: pages.contact.description,
};

export default function ContactPage() {
  return <PreviewPage page={pages.contact} />;
}
