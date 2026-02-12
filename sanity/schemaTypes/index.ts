import { type SchemaTypeDefinition } from "sanity";
import project from "./project";
import service from "./service";
import hero from "./hero";
import about from "./about";
import conflict from "./conflict";
import footer from "./footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, service, hero, about, conflict, footer],
};
