import bcrypt from 'bcryptjs';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { prisma, readRawDb } from '../lib/prisma';

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[\'"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function main() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  readRawDb();

  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteName: 'Instituto Politécnico Privado Padre Builu',
      logoUrl: '/ipppb/pic.png',
      heroTitle: 'IPPPB — FÉ E CIÊNCIA',
      heroSubtitle: 'Invista nos seus filhos ou em si. Formamos estudantes com base técnica, disciplina e valores humanos.',
      aboutTitle: 'Conheça mais Sobre Nós',
      aboutText: 'O Instituto Politécnico Privado Padre Builu é uma instituição focada no ensino e aprendizagem, voltada para a formação técnica e humana.',
      address: 'Angola',
      phone: '+244 000 000 000',
      email: 'geral@ipppb.ao',
      footerText: 'Copyright © Instituto Politécnico Privado Padre Builu',
      whatsappNumber: '244000000000',
      googleMapsEmbedUrl: null,
    },
  });

  const courses = [
    {
      title: 'Informática',
      description: 'Fundamentos de informática, redes, programação e prática laboratorial.',
      duration: '3 anos',
      level: 'Ensino técnico',
    },
    {
      title: 'Contabilidade e Gestão',
      description: 'Contabilidade, gestão administrativa e preparação para o mercado profissional.',
      duration: '3 anos',
      level: 'Ensino técnico',
    },
    {
      title: 'Eletricidade',
      description: 'Instalações elétricas, segurança, manutenção e prática técnica.',
      duration: '3 anos',
      level: 'Ensino técnico',
    },
    {
      title: 'Enfermagem',
      description: 'Base técnica de saúde, cuidados primários e ética profissional.',
      duration: '3 anos',
      level: 'Ensino técnico',
    },
  ];

  for (const c of courses) {
    await prisma.course.upsert({ where: { title: c.title }, update: c, create: { ...c, isActive: true } });
  }

  const announcements = [
    {
      title: 'Matrículas abertas',
      excerpt: 'Garanta já a sua vaga para o novo período letivo.',
      content: 'As matrículas estão abertas. Utilize o formulário de inscrição no site ou dirija-se à secretaria para concluir o processo.',
      published: true,
    },
    {
      title: 'Portal do estudante disponível',
      excerpt: 'Acompanhe inscrições e mensagens diretamente pela plataforma.',
      content: 'O portal do estudante já está disponível para acesso. Entre com as suas credenciais para acompanhar o estado da sua inscrição.',
      published: true,
    },
  ];

  for (const a of announcements) {
    const slug = slugify(a.title);
    await prisma.announcement.upsert({
      where: { slug },
      update: { ...a, publishedAt: a.published ? new Date().toISOString() : null },
      create: { ...a, slug, publishedAt: a.published ? new Date().toISOString() : null },
    });
  }

  if ((await prisma.galleryItem.count()) === 0) {
    await prisma.galleryItem.create({
      data: {
        title: 'Instituto Padre Builu',
        type: 'IMAGE',
        url: '/ipppb/pic.png',
        coverUrl: '/ipppb/pic.png',
        sortOrder: 1,
      },
    });
  }

  const adminEmail = process.env.PORTAL_ADMIN_EMAIL;
  const adminPassword = process.env.PORTAL_ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where: { email: adminEmail.toLowerCase() },
      update: { role: 'ADMIN', passwordHash },
      create: {
        email: adminEmail.toLowerCase(),
        role: 'ADMIN',
        passwordHash,
        name: 'Portal Admin',
      },
    });
  }

  console.log('Seed complete ✅');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
