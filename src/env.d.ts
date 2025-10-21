/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly NOTION_SECRET?: string;
  readonly NOTION_DATABASE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
