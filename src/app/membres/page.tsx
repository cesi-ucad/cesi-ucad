import fs from "fs";
import path from "path";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import Card from "../../components/Card";

interface Membre {
  id?: string;
  nom: string;
  "annee d'admission": number;
  photo: string;
  github: string;
}

export default function Membres() {
  // Server component: read all JSON files from public/data/membres
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
          // ensure photo path starts with /images if not absolute
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {membres.map((membre) => (
            <Card
              key={membre.id ?? membre.nom}
              title={membre.nom}
              description={`a rejoint la Section Informatique en ${membre["annee d'admission"]}`}
              image={membre.photo}
            >
              <div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">
                  GitHub :
                </h4>
                <a href={membre.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {membre.github}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
