import type { PageContent } from "@/content/pages";

type Props = {
  page: PageContent;
};

export function PreviewPage({ page }: Props) {
  return (
    <div key={page.route} data-page={page.route}>
      <main
        id="main"
        dangerouslySetInnerHTML={{ __html: page.main }}
      />
      <section
        className="closing wrap"
        dangerouslySetInnerHTML={{ __html: page.closing }}
      />
    </div>
  );
}
