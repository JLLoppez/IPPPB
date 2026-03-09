import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import { prisma } from '@/lib/prisma';
import { getDict } from '@/lib/i18n';

export default async function SobrePage() {
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
          <h1>{t.aboutTitle}</h1>
          <p>{s?.aboutText || t.aboutLead}</p>
        </section>

        <section className="feature-grid three-up">
          <article className="feature-card"><h2>{t.missionTitle}</h2><p>{t.missionText}</p></article>
          <article className="feature-card"><h2>{t.visionTitle}</h2><p>{t.visionText}</p></article>
          <article className="feature-card"><h2>{t.valuesTitle}</h2><p>{t.valuesText}</p></article>
        </section>

        <section className="story-block">
          <div>
            <h2>Padre Carlos Gime</h2>
            <p>
              O projeto original do IPPPB destaca a formação com identidade, disciplina e compromisso social.
              Esta versão mantém essa base e organiza o conteúdo para uma navegação moderna e simples.
            </p>
            <p>
              A instituição continua focada em ensino técnico, apoio ao estudante e valorização humana — sempre com
              a visão de formar profissionais que façam diferença no país.
            </p>
          </div>
          <div className="logo-panel">
            <img src="/ipppb/pic.png" alt="IPPPB" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
