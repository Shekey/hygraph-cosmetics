import { graphql } from "../gql";
import type { Stage } from "../gql/graphql";
import { HygraphClient } from "@/client";

const query = graphql(`
  query Pdp($slug: String!, $stage: Stage! = PUBLISHED) {
    pdp(where: { slug: $slug }, stage: $stage) {
      id
      __typename
      slug
      title
      description
      ogImage {
        url
      }
      components {
        ... on Tutorial {
          __typename
          id
          title
          image {
            url
          }
          items {
            __typename
            text
          }
        }
        ... on Routine {
          __typename
          id
          chapeau
          cta
          description
          image {
            url
          }
          title
          url
        }
        ... on ProductList {
          __typename
          title
          relatedProductList {
            relatedProductId
            relatedProducts {
              products {
                description
                id
                images {
                  alt
                  url
                }
                ingredients
                name
                price
                shortDescription
                slug
                stock
              }
            }
          }
        }
      }

      product {
        id
        slug
        name
        price
        ingredients
        shortDescription
        description
        stock
        images {
          alt
          url
        }
      }
    }
  }
`);

export async function getPdp(slug: string, stage: "PUBLISHED" | "DRAFT") {
  const variables = {
    slug: slug || "face-serum",
    stage: (stage as Stage) || ("PUBLISHED" as Stage),
  };

  const data = await HygraphClient.request(query, variables);

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
}
