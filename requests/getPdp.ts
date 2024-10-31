import { HygraphClient } from "@/client";
import { PdpDocument } from "@/codegen/generated/graphql";
import { PdpQuery, PdpQueryVariables, Stage } from "@/codegen/generated/types";

export async function getPdp(slug: string, stage: "PUBLISHED" | "DRAFT") {
  try {
    const variables = {
      slug: slug || "face-serum",
      stage: (stage as Stage) || ("PUBLISHED" as Stage),
    };

    const { data, error } = await HygraphClient.query<
      PdpQuery,
      PdpQueryVariables
    >({
      query: PdpDocument,
      variables,
    });

    if (error) {
      throw new Error(error.message);
    }

    const ProductResource = Object.assign(
      {},
      {
        id: `${data?.pdp?.product?.id}`,
        title: `${data?.pdp?.title}`,
        ogImage: data?.pdp?.ogImage?.url || "",
        slug: `${data?.pdp?.product?.slug}`,
        name: `${data?.pdp?.product?.name}`,
        price: `${data?.pdp?.product?.price}`,
        ingredients: `${data?.pdp?.product?.ingredients}`,
        shortDescription: `${data?.pdp?.product?.shortDescription}`,
        description: `${data?.pdp?.product?.description}`,
        stock: `${data?.pdp?.product?.stock}`,
        images: data?.pdp?.product?.images?.map((image) => {
          return {
            alt: image?.alt || "",
            url: image?.url || "",
          };
        }),
        components: data.pdp?.components,
      }
    );

    return { data: ProductResource };
  } catch (error) {
    console.error(error);
    return { data: null };
  }
}
