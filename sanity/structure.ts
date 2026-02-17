import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Solutions Section Intro")
        .child(S.document().schemaType("solutionsIntro").documentId("solutionsIntro")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings", "solutionsIntro"].includes(listItem.getId()!)
      ),
    ]);
