import type { StructureResolver } from "sanity/structure";

const singletonTypes = [
  "siteSettings",
  "solutionsIntro",
  "hero",
  "about",
  "conflict",
  "footer",
  "contact",
  "aboutPage",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Hero Section")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("Conflict Section")
        .child(S.document().schemaType("conflict").documentId("conflict")),
      S.listItem()
        .title("Solutions Section Intro")
        .child(S.document().schemaType("solutionsIntro").documentId("solutionsIntro")),
      S.listItem()
        .title("About Section")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Contact Section")
        .child(S.document().schemaType("contact").documentId("contact")),
      S.listItem()
        .title("Footer Content")
        .child(S.document().schemaType("footer").documentId("footer")),
      S.divider(),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.includes(listItem.getId()!)
      ),
    ]);
