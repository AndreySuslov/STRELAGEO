import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import * as content from "../src/content.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const traverse = traverseModule.default;
const files = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  });
let count = 0;
function asset(url) {
  assert(
    url.startsWith("/assets/") || url.startsWith("/fonts/"),
    `Unexpected local asset: ${url}`,
  );
  const file = path.join(root, "public", url);
  assert(
    fs.existsSync(file) && fs.statSync(file).size > 0,
    `Missing asset: ${url}`,
  );
  count++;
}
for (const file of files(path.join(root, "src"))) {
  const text = fs.readFileSync(file, "utf8");
  if (/\.[cm]?jsx?$/.test(file)) {
    const ast = parse(text, { sourceType: "module", plugins: ["jsx"] });
    traverse(ast, {
      Program(scope) {
        scope.scope.crawl();
        for (const binding of Object.values(scope.scope.bindings)) {
          if (binding.kind === "module")
            assert(
              binding.referenced,
              `Unused import ${binding.identifier.name} in ${file}`,
            );
        }
      },
      ImportDeclaration({ node }) {
        if (node.source.value.startsWith("."))
          assert(
            fs.existsSync(path.resolve(path.dirname(file), node.source.value)),
            `Missing import in ${file}`,
          );
      },
    });
  }
  for (const match of text.matchAll(
    /(?:["'`(])(\/(?:assets|fonts)\/[^"'`()\s$]+)(?:["'`)]|$)/g,
  ))
    asset(match[1]);
}
for (let index = 0; index < 4; index++)
  asset(`/assets/figma-topic-${index}.svg`);
for (const entry of [
  ...content.services,
  ...content.directions,
  ...content.publications,
])
  asset(entry.img);
assert.equal(content.publications.length, 4);
for (const publication of content.publications)
  assert.equal(new URL(publication.url).protocol, "https:");
const ids = new Set(content.sectionLinks.map((link) => link.id));
assert.equal(ids.size, content.sectionLinks.length, "Duplicate section IDs");
for (const link of content.navLinks)
  assert(ids.has(link.id), `Unknown navigation target ${link.id}`);
const vercel = JSON.parse(
  fs.readFileSync(path.join(root, "vercel.json"), "utf8"),
);
assert.equal(vercel.outputDirectory, "dist/client");
assert(vercel.rewrites.some((rule) => rule.source === "/privacy/"));
console.log(
  `Preflight passed: source syntax/imports, ${count} asset references, navigation, 4 article links, Vercel routes.`,
);
