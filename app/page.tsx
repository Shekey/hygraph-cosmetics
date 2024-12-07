import type { Metadata } from "next";
import { draftMode } from "next/headers";
import ComponentRenderer from "@/app/(ui)/ComponentRenderer";
import { PageController } from "@/server/application/controller/page/getPage.controller";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = draftMode();

  return await PageController.getMetaData({
    isEnabled,
    slug: "home",
    stage: isEnabled ? "DRAFT" : "PUBLISHED",
  });
}

export default async function Home() {
  const { isEnabled } = draftMode();
  const { data: page, error } = await PageController.getData({
    slug: "home",
    stage: isEnabled ? "DRAFT" : "PUBLISHED",
  });

  if (error) {
    console.error(error?.cause);

    return (
      <main className="max-w-screen-2xl mx-auto">
        <section className="mb-12">
          <h1>Page not found</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="max-w-screen-2xl mx-auto">
      <section className="mb-12">
        <ComponentRenderer data={page?.components} />
      </section>
    </main>
  );
}
