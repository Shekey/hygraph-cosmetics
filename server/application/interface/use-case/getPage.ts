import { PageEntity } from "@/server/infrastructure/repositories/cms-content/entities/getPage";
import { CONTENT_STAGES } from "@/server/shared/types";

export interface IGetPageUseCase {
  (args: { slug: string; stage: CONTENT_STAGES }): Promise<{
    data: PageEntity;
  }>;
}
