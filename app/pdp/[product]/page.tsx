import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { getPdp } from "@/server/infrastructure/repositories/cms-content/requests/getPdp";
import ComponentRenderer from "@/app/(ui)/ComponentRenderer";
import ProductDetail from "@/app/(ui)/ProductDetail";
import { PDPController } from "@/server/application/controller/pdp/getPdp.controller";

export const runtime = "edge";

type Props = {
  params: { product: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled } = draftMode();
  return PDPController.getMetaData({
    slug: params.product as string,
    stage: isEnabled ? "DRAFT" : "PUBLISHED",
    isEnabled,
  });
}

export default async function Home({
  params,
}: {
  params: { product: string };
}) {
  const { isEnabled } = draftMode();
  const { data } = await PDPController.getData({
    slug: params.product,
    stage: isEnabled ? "DRAFT" : "PUBLISHED",
  });
  return (
    <main className="max-w-screen-2xl mx-auto">
      {data && <ProductDetail product={data} />}

      <section className="mb-12">
        <ComponentRenderer data={data?.components} />
      </section>
    </main>
  );
}
