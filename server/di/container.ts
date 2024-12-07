import { createCmsContentRepository } from "./modules/cms-content.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { createContainer } from "@evyweb/ioctopus";

const ApplicationContainer = createContainer();

ApplicationContainer.load(
  Symbol("CmsContentModule"),
  createCmsContentRepository()
);

function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export function getDICmsContentRepository() {
  return getInjection("ICmsContent");
}

export function getDIPageUseCase() {
  return getInjection("IGetPageUseCase");
}

export function getDIPdpUseCase() {
  return getInjection("IGetPdpUseCase");
}

export default ApplicationContainer;
