import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPage } from "@/requests/getPage";
import { getPdp } from "@/requests/getPdp";

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
    const { page } = await getPage(slug, "PUBLISHED");
    finalPage = page;
  } else {
    const { data } = await getPdp(slug, "PUBLISHED");
    finalPage = data;
  }

  if (!finalPage || !finalPage.slug) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();

  redirect(finalPage.slug === "home" ? "/" : `/pdp/${finalPage.slug}`);
}
