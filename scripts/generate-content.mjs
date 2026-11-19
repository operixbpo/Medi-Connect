import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const preview = path.join(root, "_preview");
const outDir = path.join(root, "src", "content");

const pages = [
  ["home", "index.html", "/", "Care in Malaysia | MediConnect Malaysia"],
  ["journey", "journey.html", "/journey", "Your Journey | MediConnect Malaysia"],
  ["plan", "plan.html", "/plan", "Plan My Visit | MediConnect Malaysia"],
  ["about", "about.html", "/about", "About | MediConnect Malaysia"],
  ["contact", "contact.html", "/contact", "Contact | MediConnect Malaysia"],
  ["costs", "costs.html", "/costs", "Costs & Planning | MediConnect Malaysia"],
  ["hospitals", "hospitals.html", "/hospitals", "Explore Hospitals | MediConnect Malaysia"],
  ["services", "services.html", "/services", "Our Services | MediConnect Malaysia"],
  ["whyMalaysia", "why-malaysia.html", "/why-malaysia", "Why Malaysia | MediConnect Malaysia"],
  ["sunway", "sunway.html", "/sunway", "Sunway Medical Centre | MediConnect Malaysia"],
  ["gleneagles", "gleneagles.html", "/gleneagles", "Gleneagles Hospital KL | MediConnect Malaysia"],
  ["pantai", "pantai.html", "/pantai", "Pantai Hospital KL | MediConnect Malaysia"],
  ["princeCourt", "prince-court.html", "/prince-court", "Prince Court Medical Centre | MediConnect Malaysia"],
  ["previewNotes", "preview-notes.html", "/preview-notes", "Preview Notes | MediConnect Malaysia"],
];

function extract(html, re) {
  const m = html.match(re);
  return m ? m[1] : "";
}

function fix(html) {
  return html
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/src='assets\//g, "src='/assets/")
    .replace(/url\('assets\//g, "url('/assets/");
}

const map = {};
for (const [key, file, route, title] of pages) {
  const html = fs.readFileSync(path.join(preview, file), "utf8");
  const main = fix(extract(html, /<main id="main">([\s\S]*?)<\/main>/));
  const closing = fix(
    extract(html, /<section class="closing wrap">([\s\S]*?)<\/section>/),
  );
  const desc = extract(html, /name="description" content="([^"]*)"/);
  const current =
    extract(html, /aria-current='page' href='([^']+)'/) ||
    extract(html, /aria-current="page" href="([^"]+)"/) ||
    "";
  map[key] = { route, title, description: desc, currentNav: current, main, closing };
}

const body = `// Auto-generated from Netlify preview HTML — regenerate via scripts/generate-content.mjs
export type PageContent = {
  route: string;
  title: string;
  description: string;
  currentNav: string;
  main: string;
  closing: string;
};

export const pages = ${JSON.stringify(map, null, 2)} as const satisfies Record<string, PageContent>;

export type PageKey = keyof typeof pages;
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "pages.ts"), body);
console.log(
  "Wrote pages.ts with",
  Object.keys(map).length,
  "pages:",
  Object.keys(map).join(", "),
);
