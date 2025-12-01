import fs from "fs";
import path from "path";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import MembersListClient from "@/components/MembersListClient";

interface Membre {
  id?: string;
  nom: string;
  "annee d'admission": number;
  genre: string;
  photo: string;
  github: string;
}

export default function Membres() {
  const membresDir = path.join(process.cwd(), "public", "data", "membres");
  let membres: Membre[] = [];

  try {
    const files = fs.existsSync(membresDir) ? fs.readdirSync(membresDir) : [];
    const jsonFiles = files.filter((f) => f.endsWith(".json"));
    membres = jsonFiles
      .map((file) => {
        try {
          const raw = fs.readFileSync(path.join(membresDir, file), "utf8");
          const parsed = JSON.parse(raw) as Membre;
          if (parsed.photo && !parsed.photo.startsWith("/")) {
            parsed.photo = `/${parsed.photo}`;
          }
          if (!parsed.id) parsed.id = file.replace(/\.json$/, "");
          return parsed;
        } catch (e) {
          console.error("Failed to read or parse:", file, e);
          return null;
        }
      })
      .filter((m): m is Membre => !!m);
  } catch (e) {
    console.error("Could not read members directory:", e);
    membres = [];
  }

  return (
    <div>
      <Header />
      <Section title="Nos Membres">
        <MembersListClient initialMembers={membres} />
      </Section>
      <Footer />
    </div>
  );
}
