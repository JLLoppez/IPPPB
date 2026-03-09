import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Effects from "@/app/components/Effects";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return notFound();

  return (
    <>
      <Effects />

      <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
        <Link className="cta-btn cta-btn--resume" href="/#projects">
          ← Back to Projects
        </Link>

        <h1 className="section-title" style={{ marginTop: 24 }}>
          {project.title}
        </h1>

        <p className="muted" style={{ maxWidth: 900 }}>
          {project.summary}
        </p>

        {project.imageUrl ? (
          <div style={{ marginTop: 18, marginBottom: 18 }}>
            <div data-tilt className="thumbnail rounded js-tilt">
              <Image
                alt={project.title}
                src={project.imageUrl}
                width={1200}
                height={700}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          {project.liveUrl ? (
            <a className="cta-btn cta-btn--hero" href={project.liveUrl} rel="noreferrer" target="_blank">
              See Live
            </a>
          ) : null}
          {project.githubUrl ? (
            <a className="cta-btn text-color-main" href={project.githubUrl} rel="noreferrer" target="_blank">
              Source Code
            </a>
          ) : null}
        </div>

        <div className="card" style={{ padding: 18, maxWidth: 1000 }}>
          <h3 style={{ marginTop: 0 }}>Details</h3>
          <p style={{ whiteSpace: "pre-line" }}>{project.description}</p>

          <h4 style={{ marginTop: 18 }}>Tech</h4>
          <p className="muted">{project.tech}</p>
        </div>
      </div>
    </>
  );
}
