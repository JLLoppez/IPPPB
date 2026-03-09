import Navbar from "@/app/components/ipppb/Navbar";
import Footer from "@/app/components/ipppb/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function AnuncioDetailPage({ params }: { params: { slug: string } }) {
  const a = await prisma.announcement.findUnique({ where: { slug: params.slug } });
  if (!a || !a.published) return notFound();

  return (
    <>
      <Navbar />
      <main className="container py-5">
        <h1 className="mb-2">{a.title}</h1>
        <p className="text-muted">
          {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("pt-PT") : ""}
        </p>
        <article className="mt-4" style={{ whiteSpace: "pre-wrap" }}>
          {a.content}
        </article>
      </main>
      <Footer />
    </>
  );
}
