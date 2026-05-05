import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { client } from "@/sanity/lib/client";
import { contactQuery, siteSettingsQuery, footerQuery } from "@/sanity/lib/queries";
import { projectId } from "@/sanity/env";

export const revalidate = 3600;

export default async function ContactPage() {
  let contact = null;
  let siteSettings = null;
  let footer = null;

  if (projectId) {
    try {
      const [contactData, siteSettingsData, footerData] = await Promise.all([
        client.fetch(contactQuery),
        client.fetch(siteSettingsQuery),
        client.fetch(footerQuery),
      ]);
      contact = contactData;
      siteSettings = siteSettingsData;
      footer = footerData;
    } catch (error) {
      console.error("Sanity fetch error:", error);
    }
  }

  return (
    <main className="min-h-screen pt-20">
      <ContactSection data={contact} logoUrl={siteSettings?.logoUrl} />
      <Footer data={footer} logoUrl={siteSettings?.logoUrl} />
    </main>
  );
}
