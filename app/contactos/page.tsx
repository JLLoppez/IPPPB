import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import { prisma } from '@/lib/prisma';
import ContactForm from './ContactForm';
import { getDict } from '@/lib/i18n';

export default async function ContactosPage() {
  const [s, { t }] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: 1 } }),
    getDict(),
  ]);

  return (
    <>
      <Navbar />
      <main className="shell inner-page">
        <section className="page-banner">
          <span className="eyebrow">IPPPB</span>
          <h1>{t.contactTitle}</h1>
          <p>{t.contactLead}</p>
        </section>

        <div className="two-col">
          <article className="feature-card">
            <h2>{t.infoTitle}</h2>
            <p>📍 {s?.address || 'Angola'}</p>
            <p>📞 {s?.phone || '+244'}</p>
            <p>✉️ {s?.email || 'ipppb@example.com'}</p>
          </article>
          <article className="form-card">
            <ContactForm />
          </article>
        </div>

        {s?.googleMapsEmbedUrl ? (
          <section className="map-card">
            <h2>{t.locationTitle}</h2>
            <iframe
              src={s.googleMapsEmbedUrl}
              style={{ width: '100%', height: 380, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
