import { PdpDocument } from "@/server/infrastructure/repositories/cms-content/codegen/generated/graphql";
import {
  PdpQuery,
  PdpQueryVariables,
  Stage,
} from "@/server/infrastructure/repositories/cms-content/codegen/generated/types";
import { PDPEntity } from "../entities/getPDP";
import { HygraphError } from "../errors/HygraphError";
import { CONTENT_STAGES } from "@/server/shared/types";
import { HygraphClient } from "../client/client";

export async function getPdp(
  slug: string,
  stage: CONTENT_STAGES,
  client: typeof HygraphClient = HygraphClient
) {
  try {
    const variables = {
      slug: slug || "",
      stage: (stage as Stage) || ("PUBLISHED" as Stage),
    };

    const { data: infrastructureData, error } = await client.query<
      PdpQuery,
      PdpQueryVariables
    >({
      query: PdpDocument,
      variables,
    });

    if (error) {
      throw new Error(error.message);
    }

    const data = PDPEntity.from(infrastructureData);

    return { data };
  } catch (error: any) {
    throw new HygraphError(error.name, { cause: error.errors });
  }
}
