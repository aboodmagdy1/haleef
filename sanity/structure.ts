import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Show Site Settings as a singleton (single editable document)
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      // Show all other document types as normal lists
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId()!)
      ),
    ]);
