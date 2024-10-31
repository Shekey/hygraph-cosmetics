import { HygraphClient } from "@/client";
import { PageDocument } from "@/codegen/generated/graphql";
import {
  Stage,
  PageQuery,
  PageQueryVariables,
} from "@/codegen/generated/types";

export async function getPage(slug: string, stage: "PUBLISHED" | "DRAFT") {
  try {
    const variables = {
      slug: slug || "home",
      stage: (stage as Stage) || ("PUBLISHED" as Stage),
    };

    const { data, error } = await HygraphClient.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables,
    });

    if (error) {
      throw new Error(error.message);
    }
    return { page: data?.page };
  } catch (error) {
    console.error(error);
    return { data: null };
  }
}
