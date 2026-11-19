import type { Metadata } from "next";
import { PreviewPage } from "@/components/PreviewPage";
import { pages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: pages.plan.title },
  description: pages.plan.description,
};

export default function PlanPage() {
  return <PreviewPage page={pages.plan} />;
}
