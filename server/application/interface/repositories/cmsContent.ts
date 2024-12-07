import { PageEntity } from "@/server/infrastructure/repositories/cms-content/entities/getPage";
import { PDPEntity } from "@/server/infrastructure/repositories/cms-content/entities/getPDP";
import { CONTENT_STAGES } from "@/server/shared/types";

export interface ICmsContentRepository {
  getPdp(slug: string, stage: CONTENT_STAGES): Promise<{ data: PDPEntity }>;
  getPage(slug: string, stage: CONTENT_STAGES): Promise<{ data: PageEntity }>;
}
