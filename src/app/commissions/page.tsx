import fs from "fs";
import path from "path";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";

interface Commission {
  nom: string;
  president: string;
}

interface Membre {
  id?: string;
  nom: string;
  "annee d'admission": number;
  genre: string;
  photo: string;
  github: string;
}

export default function Commissions() {
  // Function to normalize names for matching
  const normalizeName = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z\s]/g, "") // Remove non-alphabetic except spaces
      .trim();
  };

  const commissionsDir = path.join(process.cwd(), "public", "data");
  const membresDir = path.join(process.cwd(), "public", "data", "membres");
  let commissions: Commission[] = [];
  let membres: Membre[] = [];

  try {
    const commissionsPath = path.join(commissionsDir, "commissions.json");
    const commissionsRaw = fs.readFileSync(commissionsPath, "utf8");
    commissions = JSON.parse(commissionsRaw);

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
    console.error("Could not read commissions or members directory:", e);
    commissions = [];
    membres = [];
  }

  // Create a map of normalized member names to members
  const membresMap = new Map<string, Membre>();
  membres.forEach((m) => {
    membresMap.set(normalizeName(m.nom), m);
  });

  // Enrich commissions with president data
  const enrichedCommissions = commissions.map((commission) => {
    const president = membresMap.get(normalizeName(commission.president));
    return {
      ...commission,
      presidentData: president,
    };
  });

  return (
    <div>
      <Header />
      <Section title="Commissions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrichedCommissions.map((commission, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-4 shadow-sm border-2 hover:border-blue-500 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <h3 className="font-semibold text-lg mb-2">{commission.nom}</h3>
              {commission.presidentData ? (
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={commission.presidentData.photo}
                      alt={commission.presidentData.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {commission.presidentData.nom}
                    </p>
                    <p className="text-xs text-gray-500">Président</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Président: {commission.president}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </div>
  );
}
