import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Navbar() {
  const [settings, { lang, t }] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: 1 } }),
    getDict(),
  ]);

  return (
    <>
      <section className="top-strip">
        <div className="shell top-strip-inner">
          <p>{t.welcome} — {t.siteTagline}</p>
          <LanguageSwitcher current={lang} label={t.langLabel} />
        </div>
      </section>

      <header className="site-header">
        <div className="shell nav-wrap">
          <Link className="brand" href="/">
            <Image
              src={settings?.logoUrl || '/ipppb/pic.png'}
              alt={settings?.siteName || 'IPPPB'}
              width={64}
              height={64}
              priority
            />
            <div>
              <strong>{settings?.siteName || 'IPPPB'}</strong>
              <span>{t.siteTagline}</span>
            </div>
          </Link>

          <nav className="main-nav">
            <Link href="/">{t.navHome}</Link>
            <Link href="/sobre">{t.navAbout}</Link>
            <Link href="/cursos">{t.navCourses}</Link>
            <Link href="/anuncios">{t.navAnnouncements}</Link>
            <Link href="/galeria">{t.navGallery}</Link>
            <Link href="/contactos">{t.navContact}</Link>
            <Link href="/portal">{t.navPortal}</Link>
            <Link href="/admin">{t.navAdmin}</Link>
            <Link className="btn-primary" href="/inscrition">{t.navApply}</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
