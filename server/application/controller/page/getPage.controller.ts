import { z } from "zod";

import { HygraphError } from "@/server/infrastructure/repositories/cms-content/errors/HygraphError";
import { revalidatePath } from "next/cache";
import { getDIPageUseCase } from "@/server/di/container";

const inputSchemaPageController = z.object({
  slug: z.string(),
  stage: z.union([z.literal("PUBLISHED"), z.literal("DRAFT")]),
});

export type IPageController = ReturnType<typeof getData>;

export const getData = async (
  input: Partial<z.infer<typeof inputSchemaPageController>>
) => {
  try {
    const { data: validatedInput, error: inputParseError } =
      inputSchemaPageController.safeParse(input);

    if (inputParseError) {
      return {
        error: {
          message: inputParseError.message,
          cause: inputParseError.cause,
        },
      };
    }

    const getPageUseCase = getDIPageUseCase();
    const { data } = await getPageUseCase({
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

    revalidatePath(`/${input.slug}`);
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

export const getMetaData = async (
  input: Partial<z.infer<typeof inputSchemaPageController>> & {
    isEnabled: boolean;
  }
) => {
  const { data: page, error } = await getData(input);

  if (error) {
    return {
      title: "Page not found",
      description: "Page not found",
    };
  }

  return {
    title: input.isEnabled ? `⚡️ ${page?.title}` : page?.title || "",
    description: page?.description || "",
    openGraph: {
      type: "website",
      title: page?.title || "",
      images: [page?.ogImage || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.title || "",
      description: page?.description || "",
    },
  };
};

export const PageController = {
  getData,
  getMetaData,
};
