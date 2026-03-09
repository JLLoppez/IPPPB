import Link from 'next/link';
import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';

export default async function HomePage() {
  const [s, courses, announcements, { t }] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: 1 } }),
    prisma.course.findMany({ where: { isActive: true }, orderBy: { title: 'asc' }, take: 6 }),
    prisma.announcement.findMany({ where: { published: true }, orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }], take: 3 }),
    getDict(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <section className="hero-section">
          <div className="shell hero-grid">
            <div>
              <span className="eyebrow">{t.siteTagline}</span>
              <h1>{s?.heroTitle || t.heroTitle}</h1>
              <p>{s?.heroSubtitle || t.heroSubtitle}</p>
              <div className="cta-row">
                <Link className="btn-primary" href="/inscrition">{t.heroPrimary}</Link>
                <Link className="btn-secondary" href="/sobre">{t.heroSecondary}</Link>
              </div>
            </div>
            <aside className="info-card">
              <h3>{t.quickTitle}</h3>
              <ul>
                <li><strong>📍</strong> {s?.address || 'Angola'}</li>
                <li><strong>📞</strong> {s?.phone || '+244'}</li>
                <li><strong>✉️</strong> {s?.email || 'ipppb@example.com'}</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">IPPPB</span>
              <h2>{t.aboutTitle}</h2>
            </div>
            <Link href="/sobre">{t.heroSecondary} →</Link>
          </div>
          <p className="lead-copy">{s?.aboutText || t.aboutLead}</p>
          <div className="feature-grid">
            <article className="feature-card"><h3>{t.missionTitle}</h3><p>{t.missionText}</p></article>
            <article className="feature-card"><h3>{t.visionTitle}</h3><p>{t.visionText}</p></article>
            <article className="feature-card"><h3>{t.valuesTitle}</h3><p>{t.valuesText}</p></article>
          </div>
        </section>

        <section className="section muted-section">
          <div className="shell">
            <div className="section-head">
              <h2>{t.coursesTitle}</h2>
              <Link href="/cursos">{t.heroSecondary} →</Link>
            </div>
            <div className="card-grid">
              {courses.length ? courses.map((c) => (
                <article className="course-card" key={c.id}>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <small>{c.duration || '3 anos'} • {c.level || 'Ensino técnico'}</small>
                  <Link className="text-link" href="/inscrition">{t.applyButton}</Link>
                </article>
              )) : <p>{t.coursesEmpty}</p>}
            </div>
          </div>
        </section>

        <section className="section shell">
          <div className="section-head">
            <h2>{t.announcementsTitle}</h2>
            <Link href="/anuncios">{t.heroSecondary} →</Link>
          </div>
          <div className="card-grid">
            {announcements.length ? announcements.map((a) => (
              <article className="announce-card" key={a.id}>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <Link className="text-link" href={`/anuncios/${a.slug}`}>{t.readMore}</Link>
              </article>
            )) : <p>{t.announcementsEmpty}</p>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
