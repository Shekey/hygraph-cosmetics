import { ICmsContentRepository } from "@/server/application/interface/repositories/cmsContent";
import { CONTENT_STAGES } from "@/server/shared/types";

export type IGetPdpUseCase = ReturnType<typeof getPdpUseCase>;

export const getPdpUseCase =
  (cmsContentRepository: ICmsContentRepository) =>
  async ({ slug, stage }: { slug: string; stage: CONTENT_STAGES }) => {
    return await cmsContentRepository.getPdp(slug, stage);
  };
