type IntroTemplate = Record<string, any>;

export class PageEntity {
  __typename: string = "Page";
  id: string;
  title: string;
  ogImage: string;
  slug: string;
  shortDescription: string;
  description: string;
  components: Array<any>;

  constructor(template: IntroTemplate) {
    this.id = `${template?.page?.id}`;
    this.title = `${template?.page?.title}`;
    this.ogImage = template?.page?.ogImage?.url || "";
    this.slug = `${template?.page?.slug}`;
    this.shortDescription = `${template?.page?.title}`;
    this.description = `${template?.page?.description}`;
    this.components = template.page?.components;
  }

  static from(template: IntroTemplate) {
    const entity = new PageEntity(template);
    return Object.assign({}, entity);
  }
}
