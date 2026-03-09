import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';

export default async function CursosPage() {
  const [courses, { t }] = await Promise.all([
    prisma.course.findMany({ where: { isActive: true }, orderBy: { title: 'asc' } }),
    getDict(),
  ]);

  return (
    <>
      <Navbar />
      <main className="shell inner-page">
        <section className="page-banner">
          <span className="eyebrow">IPPPB</span>
          <h1>{t.coursesTitle}</h1>
          <p>{t.aboutLead}</p>
        </section>

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
      </main>
      <Footer />
    </>
  );
}
