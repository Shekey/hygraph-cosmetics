import { ICmsContentRepository } from "@/server/application/interface/repositories/cmsContent";
import { CONTENT_STAGES } from "@/server/shared/types";

export type IGetPageUseCase = ReturnType<typeof getPageUseCase>;

export const getPageUseCase =
  (cmsContentRepository: ICmsContentRepository) =>
  async ({ slug, stage }: { slug: string; stage: CONTENT_STAGES }) => {
    return await cmsContentRepository.getPage(slug, stage);
  };
