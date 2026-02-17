import { groq } from "next-sanity";

export const projectsQuery = groq`*[_type == "project"]{
  "id": _id,
  "name": title,
  subtitle,
  description,
  "desktopMockup": desktopMockup.asset->url,
  "phoneMockup": mobileMockup.asset->url,
  bgColor,
  accentColor,
  badges,
  marqueeWords,
  marqueeBg,
  stats,
  link
}`;

export const servicesQuery = groq`*[_type == "service"]{
  _id,
  title,
  description,
  "iconName": icon,
  features,
  "bg": bgColor,
  "border": borderColor,
  "text": textColor,
  "dot": dotColor
}`;

export const heroQuery = groq`*[_type == "hero"][0]{
  _id,
  title,
  subtitle,
  ctaText,
  ctaLink
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  _id,
  title,
  subtitle,
  description,
  steps,
  "image": image.asset->url
}`;

export const conflictQuery = groq`*[_type == "conflict"][0]{
  _id,
  title,
  description,
  problems,
  solutions
}`;

export const footerQuery = groq`*[_type == "footer"][0]{
  _id,
  slogan,
  navLinks,
  location,
  email,
  phone,
  crNumber,
  socialLinks,
  workingHours
}`;

export const contactQuery = groq`*[_type == "contact"][0]{
  _id,
  title,
  description,
  receivingEmail,
  displayEmail
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  "logoUrl": logo.asset->url,
  whatsappNumber
}`;

export const solutionsIntroQuery = groq`*[_type == "solutionsIntro"][0]{
  _id,
  sectionLabel,
  title,
  titleHighlight,
  subtitle,
  paragraphs,
  ctaText,
  ctaLink
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  _id,
  heroTitle,
  heroSubtitle,
  content,
  "imageUrl": image.asset->url,
  featuresTitle,
  features,
  valuesTitle,
  values,
  ctaTitle,
  ctaSubtitle,
  ctaButtonText
}`;
