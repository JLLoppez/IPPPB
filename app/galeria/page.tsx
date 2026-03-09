import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';

export default async function GaleriaPage() {
  const [items, { t }] = await Promise.all([
    prisma.galleryItem.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }),
    getDict(),
  ]);

  return (
    <>
      <Navbar />
      <main className="shell inner-page">
        <section className="page-banner">
          <span className="eyebrow">IPPPB</span>
          <h1>{t.navGallery}</h1>
          <p>{t.aboutLead}</p>
        </section>
        {items.length === 0 ? (
          <p className="empty-note">Ainda não há itens na galeria.</p>
        ) : (
          <div className="gallery-grid">
            {items.map((it) => (
              <article key={it.id} className="gallery-card">
                {it.type === 'IMAGE' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.url} alt={it.title} />
                ) : (
                  <iframe src={it.url} title={it.title} allowFullScreen />
                )}
                <div className="gallery-caption">{it.title}</div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
