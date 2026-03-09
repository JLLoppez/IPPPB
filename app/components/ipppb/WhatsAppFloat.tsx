import { prisma } from "@/lib/prisma";

export default async function WhatsAppFloat() {
  const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  const raw = (s?.whatsappNumber || "").replace(/\D/g, "");
  if (!raw) return null;

  const href = `https://wa.me/${raw}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      style={{
        position: "fixed",
        right: 18,
        bottom: 18,
        zIndex: 9999,
        width: 54,
        height: 54,
        borderRadius: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
        background: "#25D366",
        color: "white",
        textDecoration: "none",
        fontSize: 26,
      }}
    >
      <i className="fa fa-whatsapp" />
    </a>
  );
}
