import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.previewNotes.title },
  description: pages.previewNotes.description,
};

export default function PreviewNotesPage() {
  return <PreviewPage page={pages.previewNotes} />;
}
