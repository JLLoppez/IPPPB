import { prisma } from "@/lib/prisma";
import { upsertProfile } from "../server-actions";
import { UploadField } from "@/app/components/UploadField";

export default async function ProfileAdminPage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });

  return (
    <div style={{ paddingTop: 24 }}>
      <h1 style={{ marginTop: 0 }}>Profile</h1>

      <form action={upsertProfile} className="grid" style={{ gap: 14 }}>
        <div className="grid grid-2">
          <label>
            <span className="label">Name</span>
            <input className="input" name="name" defaultValue={profile?.name ?? ""} required />
          </label>
          <label>
            <span className="label">Headline</span>
            <input className="input" name="headline" defaultValue={profile?.headline ?? ""} required />
          </label>
        </div>

        <label>
          <span className="label">Bio</span>
          <textarea className="textarea" name="bio" rows={5} defaultValue={profile?.bio ?? ""} required />
        </label>

        <div className="grid grid-2">
          <label>
            <span className="label">Email</span>
            <input className="input" name="email" defaultValue={profile?.email ?? ""} />
          </label>
          <label>
            <span className="label">Phone</span>
            <input className="input" name="phone" defaultValue={profile?.phone ?? ""} />
          </label>
        </div>

        <div className="grid grid-2">
          <label>
            <span className="label">Location</span>
            <input className="input" name="location" defaultValue={profile?.location ?? ""} />
          </label>
          <label>
            <span className="label">GitHub URL</span>
            <input className="input" name="githubUrl" defaultValue={profile?.githubUrl ?? ""} />
          </label>
        </div>

        <label>
          <span className="label">LinkedIn URL</span>
          <input className="input" name="linkedinUrl" defaultValue={profile?.linkedinUrl ?? ""} />
        </label>

        <UploadField
          name="avatarUrl"
          dir="avatar"
          accept="image/*"
          label="Profile picture"
          initialValue={profile?.avatarUrl ?? "/uploads/avatar/avatar.jpg"}
        />

        <button className="btn" type="submit">Save profile</button>
      </form>
    </div>
  );
}
