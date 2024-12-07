import PDPData from "./pdp.data.json";
import PageData from "./page.data.json";

export class MockHygraphClient {
  public query(query: any, variables: any) {
    if (query?.page && query?.page.__typename === "Page") {
      return {
        data: PageData.page,
      };
    }

    if (query?.pdp && query?.pdp.__typename === "Pdp") {
      return {
        data: PDPData.pdp,
      };
    }
  }
}
