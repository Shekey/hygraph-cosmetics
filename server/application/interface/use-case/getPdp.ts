import { PDPEntity } from "@/server/infrastructure/repositories/cms-content/entities/getPDP";
import { CONTENT_STAGES } from "@/server/shared/types";

export interface IGetPdpUseCase {
  (args: { slug: string; stage: CONTENT_STAGES }): Promise<{ data: PDPEntity }>;
}
