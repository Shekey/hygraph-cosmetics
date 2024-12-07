import { ICmsContentRepository } from "../application/interface/repositories/cmsContent";
import { IGetPageUseCase } from "../application/interface/use-case/getPage";
import { IGetPdpUseCase } from "../application/interface/use-case/getPdp";

export const DI_SYMBOLS = {
  // Repositories
  ICmsContent: Symbol.for("ICmsContent"),

  // Use Cases
  IGetPageUseCase: Symbol.for("IGetPageUseCase"),
  IGetPdpUseCase: Symbol.for("IGetPdpUseCase"),
};

export interface DI_RETURN_TYPES {
  // Repositories
  ICmsContent: ICmsContentRepository;

  // Use Cases
  IGetPageUseCase: IGetPageUseCase;
  IGetPdpUseCase: IGetPdpUseCase;
}
