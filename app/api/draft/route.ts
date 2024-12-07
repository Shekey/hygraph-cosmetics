import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPage } from "@/server/infrastructure/repositories/cms-content/requests/getPage";
import { getPdp } from "@/server/infrastructure/repositories/cms-content/requests/getPdp";
import { PageController } from "@/server/application/controller/page/getPage.controller";
import { PDPController } from "@/server/application/controller/pdp/getPdp.controller";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== "MY_SECRET_TOKEN" || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  let finalPage = null;

  if (slug === "home") {
    const { data: page, error } = await PageController.getData({
      slug,
      stage: "PUBLISHED",
    });
    finalPage = page;
  } else {
    const { data } = await PDPController.getData({
      slug,
      stage: "PUBLISHED",
    });
    finalPage = data;
  }

  if (!finalPage || !finalPage.slug) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();

  redirect(finalPage.slug === "home" ? "/" : `/pdp/${finalPage.slug}`);
}
