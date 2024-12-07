type IntroTemplate = Record<string, any>;

export class PDPEntity {
  __typename: string = "Page";
  id: string;
  title: string;
  ogImage: string;
  slug: string;
  name: string;
  price: string;
  ingredients: string;
  shortDescription: string;
  description: string;
  stock: string;
  images: Array<{ alt: string; url: string }>;
  components: Array<any>;

  constructor(template: IntroTemplate) {
    this.id = `${template?.pdp?.product?.id}`;
    this.title = `${template?.pdp?.title}`;
    this.ogImage = template?.pdp?.ogImage?.url || "";
    this.slug = `${template?.pdp?.product?.slug}`;
    this.name = `${template?.pdp?.product?.name}`;
    this.price = `${template?.pdp?.product?.price}`;
    this.ingredients = `${template?.pdp?.product?.ingredients}`;
    this.shortDescription = `${template?.pdp?.product?.shortDescription}`;
    this.description = `${template?.pdp?.product?.description}`;
    this.stock = `${template?.pdp?.product?.stock}`;
    this.images = template?.pdp?.product?.images?.map(
      (image: { alt: string; url: string }) => {
        return {
          alt: image?.alt || "",
          url: image?.url || "",
        };
      }
    );
    this.components = template.pdp?.components;
  }

  static from(template: IntroTemplate) {
    const entity = new PDPEntity(template);
    return Object.assign({}, entity);
  }
}
