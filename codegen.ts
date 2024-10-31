import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    "https://eu-west-2.cdn.hygraph.com/content/cm2aiz0o301uw07uqqvo5irxw/master",
  documents: ["queries/**/*"],
  generates: {
    "codegen/generated/graphql.ts": {
      preset: "import-types",
      presetConfig: {
        typesPath: "./types",
      },
      plugins: ["typescript-react-apollo"],
    },
    "codegen/generated/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
