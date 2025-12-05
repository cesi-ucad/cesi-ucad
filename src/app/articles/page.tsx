import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import ArticlesListClient from "../../components/ArticlesListClient";

interface Membre {
  id?: string;
  nom: string;
  "annee d'admission": number;
  genre: string;
  photo: string;
  github: string;
}

interface Article {
  title: string;
  author: string;
  date: string;
  content: string;
  slug: string;
  authorData?: Membre;
}

export default function Articles() {
  const articlesDir = path.join(process.cwd(), "public", "articles");
  const membresDir = path.join(process.cwd(), "public", "data", "membres");
  let articles: Article[] = [];
  let membres: Membre[] = [];

  // Function to normalize names for matching
  const normalizeName = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z\s]/g, "") // Remove non-alphabetic except spaces
      .trim();
  };

  try {
    // Read members
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

    // Create members map by id
    const membresMap = new Map<string, Membre>();
    membres.forEach((m) => {
      if (m.id) {
        membresMap.set(m.id, m);
      }
    });

    // Read articles
    const articleFiles = fs.existsSync(articlesDir)
      ? fs.readdirSync(articlesDir)
      : [];
    const mdFiles = articleFiles.filter((f) => f.endsWith(".md"));
    articles = mdFiles
      .map((file) => {
        try {
          const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
          const { data, content } = matter(raw);
          const htmlContent = marked(content);
          const authorData = membresMap.get(data.author);
          return {
            title: data.title,
            author: data.author,
            date: data.date,
            content: htmlContent,
            slug: file.replace(/\.md$/, ""),
            authorData,
          } as Article;
        } catch (e) {
          console.error("Failed to read or parse article:", file, e);
          return null;
        }
      })
      .filter((a): a is Article => !!a)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending
  } catch (e) {
    console.error("Could not read articles or members directory:", e);
    articles = [];
  }

  return (
    <div>
      <Header />
      <Section title="Articles">
        <ArticlesListClient articles={articles} />
      </Section>
      <Footer />
    </div>
  );
}
