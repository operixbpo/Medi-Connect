import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.princeCourt.title },
  description: pages.princeCourt.description,
};

export default function PrinceCourtPage() {
  return <PreviewPage page={pages.princeCourt} />;
}
