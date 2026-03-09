import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';

export default async function Footer() {
  const [s, { t }] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: 1 } }),
    getDict(),
  ]);

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <h3>{t.footerText}</h3>
          <p>{s?.footerText || 'Copyright © Instituto Politécnico Privado Padre Builu'}</p>
        </div>
        <div>
          <h4>{t.contactTitle}</h4>
          <p>{s?.address || 'Angola'}</p>
          {s?.phone ? <p>{s.phone}</p> : null}
          {s?.email ? <p>{s.email}</p> : null}
        </div>
        <div>
          <h4>{t.navHome}</h4>
          <div className="footer-links">
            <Link href="/sobre">{t.navAbout}</Link>
            <Link href="/cursos">{t.navCourses}</Link>
            <Link href="/contactos">{t.navContact}</Link>
            <Link href="/inscrition">{t.navApply}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
