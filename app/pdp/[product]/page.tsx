import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { getPdp } from "@/queries/getPdp";
import ComponentRenderer from "@/components/ComponentRenderer";
import ProductDetail from "@/components/ProductDetail";

export const runtime = "edge";

type Props = {
  params: { product: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const { data: pdp } = await getPdp(
    params.product as string,
    isEnabled ? "DRAFT" : "PUBLISHED"
  );

  return {
    title: isEnabled ? `⚡️ ${pdp?.title}` : pdp?.title,
    description: pdp?.description,
    openGraph: {
      type: "website",
      title: pdp?.title,
      images: [pdp?.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pdp?.title,
      description: pdp?.description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: { product: string };
}) {
  const { isEnabled } = draftMode();
  const { data } = await getPdp(
    params.product as string,
    isEnabled ? "DRAFT" : "PUBLISHED"
  );
  return (
    <main className="max-w-screen-2xl mx-auto">
      {data && <ProductDetail product={data} />}

      <section className="mb-12">
        <ComponentRenderer data={data?.components} />
      </section>
    </main>
  );
}
