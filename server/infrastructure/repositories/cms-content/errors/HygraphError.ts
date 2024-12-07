export class HygraphError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "HygraphError";
  }
}

export class InputParseError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "InputParseError";
  }
}

export class PageNotFound extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "PageNotFound";
  }
}
