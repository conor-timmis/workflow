#!/usr/bin/env node
/**
 * Bootstrap workflow template into a target directory.
 * Usage: node bin/init.mjs [directory] [--name Name] [--force] [--compat] [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.join(__dirname, "..");
const MARKER_START = "# --- workflow (managed block: start) ---";
const MARKER_END = "# --- workflow (managed block: end) ---";

const GITIGNORE_BLOCK = [
  "",
  MARKER_START,
  "# Dependencies",
  "node_modules/",
  "",
  "# Environment",
  ".env",
  ".env.*",
  "!.env.example",
  "",
  "# Build outputs",
  "dist/",
  "build/",
  "out/",
  "",
  "# Logs & coverage",
  "*.log",
  "coverage/",
  "",
  "# Obsidian local state",
  "second-brain/.obsidian/workspace.json",
  "second-brain/.obsidian/workspace-mobile.json",
  "second-brain/.obsidian/plugins/",
  "second-brain/.trash/",
  MARKER_END,
  "",
].join("\n");

function parseArgs(argv) {
  const out = {
    target: process.cwd(),
    name: null,
    force: false,
    compat: false,
    dryRun: false,
    help: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force" || a === "-f") out.force = true;
    else if (a === "--compat") out.compat = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a === "--name") out.name = argv[++i];
    else if (!a.startsWith("-")) out.target = path.resolve(a);
  }
  return out;
}

function printHelp() {
  console.log(`workflow init — bootstrap AGENT.md, second-brain, documentation into a project

Usage:
  node bin/init.mjs [directory] [options]
  workflow-init [directory] [options]

Options:
  --name <name>   Project display name (default: directory basename)
  --force, -f     Overwrite existing workflow files
  --compat        Also write AGENTS.md and CLAUDE.md (copies of AGENT.md)
  --dry-run       Show actions without writing
  --help, -h      This message

Default directory is the current working directory.
`);
}

function ensureDir(dir, dryRun) {
  if (dryRun) return;
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest, { force, dryRun }, transform) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest, dryRun);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, { force, dryRun }, transform);
    } else if (entry.isFile()) {
      copyFileWithTransform(srcPath, destPath, { force, dryRun }, transform);
    }
  }
}

function copyFileWithTransform(src, dest, { force, dryRun }, transform) {
  if (!fs.existsSync(src)) {
    console.warn(`Skip: source not found ${src}`);
    return;
  }
  if (fs.existsSync(dest) && !force) {
    console.log(`Skip ${path.basename(dest)}: already exists (use --force)`);
    return;
  }
  let content = fs.readFileSync(src, "utf8");
  if (transform) content = transform(content);
  if (dryRun) {
    console.log(`Would write ${dest}`);
    return;
  }
  ensureDir(path.dirname(dest), false);
  fs.writeFileSync(dest, content, "utf8");
  console.log(`Wrote ${dest}`);
}

function copyFile(src, dest, opts) {
  copyFileWithTransform(src, dest, opts, null);
}

function substituteProjectName(content, projectName) {
  return content.replaceAll("{{PROJECT_NAME}}", projectName);
}

function mergeGitignore(targetDir, { force, dryRun }) {
  const dest = path.join(targetDir, ".gitignore");
  if (!fs.existsSync(dest)) {
    if (dryRun) {
      console.log(`Would create ${dest}`);
      return;
    }
    fs.writeFileSync(dest, GITIGNORE_BLOCK.trimStart() + "\n", "utf8");
    console.log(`Created ${dest}`);
    return;
  }
  const existing = fs.readFileSync(dest, "utf8");
  if (existing.includes(MARKER_START) && existing.includes(MARKER_END)) {
    if (force) {
      const start = existing.indexOf(MARKER_START);
      const end = existing.indexOf(MARKER_END) + MARKER_END.length;
      const next =
        existing.slice(0, start).replace(/\s+$/, "") +
        "\n" +
        GITIGNORE_BLOCK.trim() +
        "\n" +
        existing.slice(end).replace(/^\s+/, "");
      if (dryRun) {
        console.log(`Would update managed block in ${dest}`);
        return;
      }
      fs.writeFileSync(dest, next, "utf8");
      console.log(`Updated managed block in ${dest}`);
    } else {
      console.log(`Skip .gitignore: managed block present (use --force to refresh)`);
    }
    return;
  }
  if (dryRun) {
    console.log(`Would append managed block to ${dest}`);
    return;
  }
  const sep = existing.endsWith("\n") ? "" : "\n";
  fs.appendFileSync(dest, sep + GITIGNORE_BLOCK, "utf8");
  console.log(`Appended managed block to ${dest}`);
}

function scaffoldAgentMemory(targetDir, { dryRun }) {
  const categories = ["decisions", "patterns", "context", "feedback"];
  for (const cat of categories) {
    const dir = path.join(targetDir, ".agent-memory", cat);
    const keep = path.join(dir, ".gitkeep");
    if (dryRun) {
      console.log(`Would create ${keep}`);
      continue;
    }
    fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(keep)) {
      fs.writeFileSync(keep, "", "utf8");
      console.log(`Wrote ${keep}`);
    }
  }
}

function writeReadme(targetDir, projectName, { force, dryRun }) {
  const dest = path.join(targetDir, "README.md");
  if (fs.existsSync(dest) && !force) {
    console.log(`Skip README.md: already exists (use --force)`);
    return;
  }
  const content = `# ${projectName}

> Bootstrapped from [workflow](https://github.com/conor-timmis/workflow).

## MVP checklist

- [ ] Define project goal
- [ ] Customize \`AGENT.md\` project layout
- [ ] Add architecture doc in \`documentation/\`
- [ ] First feature shipped

## Quick links

- [AGENT.md](./AGENT.md) — AI agent instructions
- [documentation/](./documentation/) — workflows and prompts
- [second-brain/wiki/Home.md](./second-brain/wiki/Home.md) — knowledge map

## Development

<!-- Add install and run instructions -->
`;
  if (dryRun) {
    console.log(`Would write ${dest}`);
    return;
  }
  fs.writeFileSync(dest, content, "utf8");
  console.log(`Wrote ${dest}`);
}

const args = parseArgs(process.argv);
if (args.help) {
  printHelp();
  process.exit(0);
}

const projectName = args.name || path.basename(args.target);
const transform = (c) => substituteProjectName(c, projectName);

console.log(`Target: ${args.target}`);
console.log(`Project: ${projectName}\n`);

ensureDir(args.target, args.dryRun);

// AGENT.md from template
copyFileWithTransform(
  path.join(PKG_ROOT, "templates", "AGENT.md"),
  path.join(args.target, "AGENT.md"),
  args,
  transform,
);

// Compat copies for tools that expect legacy filenames
if (args.compat) {
  for (const legacy of ["AGENTS.md", "CLAUDE.md"]) {
    copyFileWithTransform(
      path.join(PKG_ROOT, "templates", "AGENT.md"),
      path.join(args.target, legacy),
      args,
      transform,
    );
  }
}

// Copy trees
copyDir(path.join(PKG_ROOT, "documentation"), path.join(args.target, "documentation"), args, null);
copyDir(path.join(PKG_ROOT, "second-brain"), path.join(args.target, "second-brain"), args, null);

// Personalize wiki Home with project name
const homePath = path.join(args.target, "second-brain", "wiki", "Home.md");
if (fs.existsSync(homePath) && !args.dryRun) {
  let home = fs.readFileSync(homePath, "utf8");
  if (!home.includes(projectName) && projectName !== "second-brain") {
    home = home.replace(
      "Map of content for this project's second brain.",
      `Map of content for **${projectName}**.`,
    );
    fs.writeFileSync(homePath, home, "utf8");
  }
}

writeReadme(args.target, projectName, args);
scaffoldAgentMemory(args.target, args);
mergeGitignore(args.target, args);

console.log(args.dryRun ? "\nDry run complete." : "\nDone. Next: read documentation/workflows/new-repo.md");
