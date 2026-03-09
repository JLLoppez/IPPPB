import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';

export default async function AnunciosPage() {
  const [items, { t }] = await Promise.all([
    prisma.announcement.findMany({ where: { published: true }, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }] }),
    getDict(),
  ]);

  return (
    <>
      <Navbar />
      <main className="shell inner-page">
        <section className="page-banner">
          <span className="eyebrow">IPPPB</span>
          <h1>{t.announcementsTitle}</h1>
          <p>{t.contactLead}</p>
        </section>
        <div className="stack-list">
          {items.length ? items.map((a) => (
            <Link key={a.id} className="list-card" href={`/anuncios/${a.slug}`}>
              <div className="list-card-top">
                <h3>{a.title}</h3>
                <small>{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('pt-PT') : ''}</small>
              </div>
              <p>{a.excerpt}</p>
            </Link>
          )) : <p>{t.announcementsEmpty}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
