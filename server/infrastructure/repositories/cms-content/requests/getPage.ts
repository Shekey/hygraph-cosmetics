import { HygraphClient } from "@/server/infrastructure/repositories/cms-content/client/client";
import { PageDocument } from "@/server/infrastructure/repositories/cms-content/codegen/generated/graphql";
import {
  Stage,
  PageQuery,
  PageQueryVariables,
} from "@/server/infrastructure/repositories/cms-content/codegen/generated/types";
import { HygraphError } from "../errors/HygraphError";
import { PageEntity } from "../entities/getPage";
import { CONTENT_STAGES } from "@/server/shared/types";

export async function getPage(
  slug: string,
  stage: CONTENT_STAGES,
  client: typeof HygraphClient = HygraphClient
) {
  try {
    const variables = {
      slug: slug || "home",
      stage: (stage as Stage) || ("PUBLISHED" as Stage),
    };

    const { data: infrastructureData } = await client.query<
      PageQuery,
      PageQueryVariables
    >({
      query: PageDocument,
      variables,
    });

    const data = PageEntity.from(infrastructureData);

    return { data };
  } catch (error: any) {
    throw new HygraphError("Hygraph error", {
      cause: error.cause.result?.errors,
    });
  }
}
