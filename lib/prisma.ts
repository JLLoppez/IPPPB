import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from "node:fs";
import path from "node:path";

export type Role = "ADMIN" | "STUDENT";
export type GalleryType = "IMAGE" | "VIDEO";

type BaseRecord = { id: number; createdAt?: string; updatedAt?: string };

type Profile = {
  id: number;
  name: string;
  headline: string;
  bio: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  avatarUrl: string | null;
  updatedAt: string;
};

type Project = BaseRecord & {
  title: string;
  slug: string;
  summary: string;
  description: string;
  tech: string;
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
};

type Design = BaseRecord & {
  title: string;
  summary: string;
  tool: string | null;
  imageUrl: string | null;
  fileUrl: string | null;
};

type Resume = BaseRecord & {
  title: string;
  fileUrl: string;
  isDefault: boolean;
};

type SiteSetting = {
  id: number;
  siteName: string;
  logoUrl: string | null;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  footerText: string | null;
  whatsappNumber: string | null;
  googleMapsEmbedUrl: string | null;
  updatedAt: string;
};

type Course = BaseRecord & {
  title: string;
  description: string;
  duration: string | null;
  level: string | null;
  isActive: boolean;
};

type Announcement = BaseRecord & {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt: string | null;
};

type ContactMessage = BaseRecord & {
  userId: number | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
};

type Application = BaseRecord & {
  userId: number | null;
  firstName: string;
  lastName: string;
  idNumber: string | null;
  email: string;
  phone: string | null;
  classLevel: string | null;
  course: string | null;
  status: string;
};

type User = BaseRecord & {
  email: string;
  name: string | null;
  passwordHash: string;
  role: Role;
};

type GalleryItem = BaseRecord & {
  title: string;
  type: GalleryType;
  url: string;
  coverUrl: string | null;
  sortOrder: number;
};

type Database = {
  profile: Profile[];
  project: Project[];
  design: Design[];
  resume: Resume[];
  siteSetting: SiteSetting[];
  course: Course[];
  announcement: Announcement[];
  contactMessage: ContactMessage[];
  application: Application[];
  user: User[];
  galleryItem: GalleryItem[];
  _meta: { initializedAt: string };
};

const dbDir = path.join(process.cwd(), "data");
const dbPath = path.join(dbDir, "db.json");

function nowIso() {
  return new Date().toISOString();
}

function ensureDbFile() {
  if (!existsSync(dbDir)) mkdirSync(dbDir, { recursive: true });
  if (!existsSync(dbPath)) {
    const initial: Database = {
      profile: [],
      project: [],
      design: [],
      resume: [],
      siteSetting: [],
      course: [],
      announcement: [],
      contactMessage: [],
      application: [],
      user: [],
      galleryItem: [],
      _meta: { initializedAt: nowIso() },
    };
    writeFileSync(dbPath, JSON.stringify(initial, null, 2));
  }
}

function readDb(): Database {
  ensureDbFile();
  return JSON.parse(readFileSync(dbPath, "utf8")) as Database;
}

function writeDb(db: Database) {
  // Atomic write: write to a temp file then rename to avoid partial-write corruption
  const tmp = dbPath + ".tmp";
  writeFileSync(tmp, JSON.stringify(db, null, 2));
  renameSync(tmp, dbPath);
}

function matchesWhere<T extends Record<string, any>>(item: T, where?: Record<string, any>) {
  if (!where) return true;
  return Object.entries(where).every(([key, value]) => item[key] === value);
}

function compareValues(a: any, b: any) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  if (typeof a === "number" && typeof b === "number") return a - b;
  const ad = Date.parse(a);
  const bd = Date.parse(b);
  if (!Number.isNaN(ad) && !Number.isNaN(bd)) return ad - bd;
  return String(a).localeCompare(String(b));
}

function sortItems<T extends Record<string, any>>(items: T[], orderBy?: any): T[] {
  if (!orderBy) return [...items];
  const orderDefs = Array.isArray(orderBy) ? orderBy : [orderBy];
  return [...items].sort((a, b) => {
    for (const def of orderDefs) {
      const [field, dir] = Object.entries(def)[0] as [string, "asc" | "desc"];
      const cmp = compareValues(a[field], b[field]);
      if (cmp !== 0) return dir === "desc" ? -cmp : cmp;
    }
    return 0;
  });
}

function nextId<T extends BaseRecord>(items: T[]) {
  return items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
}

function modelApi<K extends keyof Database>(table: K) {
  return {
    async findUnique({ where }: { where: Record<string, any> }) {
      const db = readDb();
      return (db[table] as any[]).find((item) => matchesWhere(item, where)) ?? null;
    },
    async findMany(args: { where?: Record<string, any>; orderBy?: any; take?: number } = {}) {
      const db = readDb();
      let items = (db[table] as any[]).filter((item) => matchesWhere(item, args.where));
      items = sortItems(items, args.orderBy);
      if (typeof args.take === "number") items = items.slice(0, args.take);
      return items;
    },
    async count(args: { where?: Record<string, any> } = {}) {
      const db = readDb();
      return (db[table] as any[]).filter((item) => matchesWhere(item, args.where)).length;
    },
    async create({ data }: { data: Record<string, any> }) {
      const db = readDb();
      const items = db[table] as any[];
      const ts = nowIso();
      const record: any = { ...data };
      if (typeof record.id !== "number") record.id = nextId(items as BaseRecord[]);
      if (!("createdAt" in record)) record.createdAt = ts;
      if (!("updatedAt" in record)) record.updatedAt = ts;
      items.push(record);
      writeDb(db);
      return record;
    },
    async update({ where, data }: { where: Record<string, any>; data: Record<string, any> }) {
      const db = readDb();
      const items = db[table] as any[];
      const index = items.findIndex((item) => matchesWhere(item, where));
      if (index === -1) throw new Error(`${String(table)} not found`);
      items[index] = {
        ...items[index],
        ...data,
        ...(Object.prototype.hasOwnProperty.call(items[index], "updatedAt") ? { updatedAt: nowIso() } : {}),
      };
      writeDb(db);
      return items[index];
    },
    async updateMany({ where, data }: { where?: Record<string, any>; data: Record<string, any> }) {
      const db = readDb();
      const items = db[table] as any[];
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        if (!where || matchesWhere(items[i], where)) {
          items[i] = {
            ...items[i],
            ...data,
            ...(Object.prototype.hasOwnProperty.call(items[i], "updatedAt") ? { updatedAt: nowIso() } : {}),
          };
          count++;
        }
      }
      writeDb(db);
      return { count };
    },
    async delete({ where }: { where: Record<string, any> }) {
      const db = readDb();
      const items = db[table] as any[];
      const index = items.findIndex((item) => matchesWhere(item, where));
      if (index === -1) throw new Error(`${String(table)} not found`);
      const [removed] = items.splice(index, 1);
      writeDb(db);
      return removed;
    },
    async upsert({ where, update, create }: { where: Record<string, any>; update: Record<string, any>; create: Record<string, any> }) {
      const existing = await (this as any).findUnique({ where });
      if (existing) {
        return (this as any).update({ where, data: update });
      }
      return (this as any).create({ data: create });
    },
  };
}

export const prisma = {
  profile: modelApi("profile"),
  project: modelApi("project"),
  design: modelApi("design"),
  resume: modelApi("resume"),
  siteSetting: modelApi("siteSetting"),
  course: modelApi("course"),
  announcement: modelApi("announcement"),
  contactMessage: modelApi("contactMessage"),
  application: modelApi("application"),
  user: modelApi("user"),
  galleryItem: modelApi("galleryItem"),
};

export function readRawDb() {
  return readDb();
}

export function writeRawDb(db: Database) {
  writeDb(db);
}
