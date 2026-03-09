import Navbar from '@/app/components/ipppb/Navbar';
import Footer from '@/app/components/ipppb/Footer';
import ApplyForm from './ApplyForm';
import { getDict } from '@/lib/i18n';

export default async function InscritionPage() {
  const { t } = await getDict();
  return (
    <>
      <Navbar />
      <main className="shell inner-page narrow-page">
        <section className="page-banner">
          <span className="eyebrow">IPPPB</span>
          <h1>{t.inscriptionTitle}</h1>
          <p>{t.inscriptionLead}</p>
        </section>
        <article className="form-card">
          <ApplyForm />
        </article>
      </main>
      <Footer />
    </>
  );
}
