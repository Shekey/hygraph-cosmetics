import { z } from "zod";

import { HygraphError } from "@/server/infrastructure/repositories/cms-content/errors/HygraphError";
import { getDIPdpUseCase } from "@/server/di/container";

const inputSchema = z.object({
  slug: z.string(),
  stage: z.union([z.literal("PUBLISHED"), z.literal("DRAFT")]),
});

export type IPdpController = ReturnType<typeof getData>;

const getData = async (input: Partial<z.infer<typeof inputSchema>>) => {
  try {
    const { data: validatedInput, error: inputParseError } =
      inputSchema.safeParse(input);

    if (inputParseError) {
      return {
        error: {
          message: inputParseError.message,
          cause: inputParseError.cause,
        },
      };
    }

    const getPdpUseCase = getDIPdpUseCase();
    const { data } = await getPdpUseCase({
      slug: validatedInput.slug,
      stage: validatedInput.stage,
    });

    if (!data) {
      return {
        error: {
          message: "Page not found",
          cause: { type: "PAGE_NOT_FOUND" },
        },
      };
    }

    return { data };
  } catch (error: any) {
    if (error instanceof HygraphError) {
      return {
        error: {
          message: error.message,
          cause: error.cause,
        },
      };
    }

    return {
      error: {
        message: "Internal server error",
        cause: { type: "INTERNAL_SERVER_ERROR" },
      },
    };
  }
};

const getMetaData = async (
  input: Partial<z.infer<typeof inputSchema>> & {
    isEnabled: boolean;
  }
) => {
  const { data: pdp, error } = await getData(input);

  if (error) {
    return {
      title: "Page not found",
      description: "Page not found",
    };
  }

  return {
    title: input.isEnabled ? `⚡️ ${pdp?.title}` : pdp?.title,
    description: pdp?.description,
    openGraph: {
      type: "website",
      title: pdp?.title,
      images: [pdp?.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pdp?.title,
      description: pdp?.description,
    },
  };
};

export const PDPController = {
  getData,
  getMetaData,
};
