import { ICmsContentRepository } from "@/server/application/interface/repositories/cmsContent";
import { HygraphClient } from "./client/client";
import { getPdp } from "./requests/getPdp";
import { CONTENT_STAGES } from "@/server/shared/types";
import { getPage } from "./requests/getPage";

export class HygraphRepository implements ICmsContentRepository {
  private static _client: typeof HygraphClient | undefined = undefined;
  constructor() {
    if (!HygraphRepository._client) {
      HygraphRepository._client = HygraphClient;
    } else {
      HygraphRepository._client;
    }
  }

  async getPdp(slug: string, stage: CONTENT_STAGES) {
    return await getPdp(slug, stage, HygraphRepository._client);
  }

  async getPage(slug: string, stage: CONTENT_STAGES) {
    return await getPage(slug, stage, HygraphRepository._client);
  }
}
