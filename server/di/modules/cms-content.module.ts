import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "@/server/di/types";
import { HygraphRepository } from "@/server/infrastructure/repositories/cms-content";
import { getPageUseCase } from "@/server/domain/use-case/getPage.use-case";
import { getPdpUseCase } from "@/server/domain/use-case/getPdp.use-case";
import { MockHygraphClient } from "@/server/infrastructure/repositories/cms-content/client/mock.client";

export function createCmsContentRepository() {
  const cmsContentRepository = createModule();

  if (process.env.NODE_ENV === "test") {
    cmsContentRepository
      .bind(DI_SYMBOLS.ICmsContent)
      .toClass(MockHygraphClient);
  } else {
    cmsContentRepository
      .bind(DI_SYMBOLS.ICmsContent)
      .toClass(HygraphRepository);
  }

  /* page */
  cmsContentRepository
    .bind(DI_SYMBOLS.IGetPageUseCase)
    .toHigherOrderFunction(getPageUseCase, [DI_SYMBOLS.ICmsContent]);

  /* pdp */
  cmsContentRepository
    .bind(DI_SYMBOLS.IGetPdpUseCase)
    .toHigherOrderFunction(getPdpUseCase, [DI_SYMBOLS.ICmsContent]);

  return cmsContentRepository;
}
