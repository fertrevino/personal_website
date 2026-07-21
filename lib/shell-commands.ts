import { about, contact, now, sideProjects } from "@/lib/shell-content";

export type CommandRouter = {
  push: (href: string) => void;
};

export type CommandCtx = {
  router: CommandRouter;
  toggleMatrix: () => void;
};

export type CommandResult = {
  lines: string[];
  sideEffect?: "clear";
};

// Every entry below is a real, working path: a file you can `cat`, a
// directory you can `cd`/`ls` into, or a file you can `open`. Nothing is
// listed unless it does something — no dead ends.

// Plain data files: `cat` prints their real content.
const FILES: Record<string, string[]> = {
  "about.md": [about.heading, "", about.body],
  ".zshrc": [
    'export EDITOR="nvim"',
    "",
    'alias ll="ls -la"',
    'alias k="kubectl"',
    'alias tf="terraform"',
  ],
};

// Executable scripts: `cat` shows their source, `./<script>` runs them and
// prints what they'd echo. Typing the bare name (no ./) is "not on PATH",
// same as a real shell.
const SCRIPTS: Record<string, string[]> = {
  "now.sh": [now.role, "", now.description, "", `tags: ${now.tags.join(", ")}`],
  "contact.sh": [contact.heading, "", contact.body, "", contact.email],
};

function scriptSource(name: string): string[] {
  const output = SCRIPTS[name];
  return [
    "#!/bin/bash",
    ...output.map((line) => (line ? `echo "${line}"` : "echo")),
  ];
}

const EXECUTABLES = Object.keys(SCRIPTS).map((name) => `./${name}`);

const DIRECTORIES = ["posts", "resume"];

type LsEntry = {
  name: string;
  kind: "file" | "exec" | "dir";
  size: number;
  hidden?: boolean;
};

// Sizes are illustrative except resume.pdf, which is the real file size.
const LS_ENTRIES: LsEntry[] = [
  { name: ".", kind: "dir", size: 192, hidden: true },
  { name: "..", kind: "dir", size: 256, hidden: true },
  { name: ".zshrc", kind: "file", size: 412, hidden: true },
  { name: "about.md", kind: "file", size: 1240 },
  { name: "now.sh", kind: "exec", size: 312 },
  { name: "contact.sh", kind: "exec", size: 298 },
  { name: "posts", kind: "dir", size: 160 },
  { name: "resume.pdf", kind: "file", size: 277412 },
];

function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)}K`;
  return `${Math.round(kb / 1024)}M`;
}

function lsDisplayName(e: LsEntry): string {
  const isDotEntry = e.name === "." || e.name === "..";
  return e.kind === "dir" && !isDotEntry ? `${e.name}/` : e.name;
}

function lsLongLine(e: LsEntry, humanReadable: boolean): string {
  const perms =
    e.kind === "dir" ? "drwxr-xr-x" : e.kind === "exec" ? "-rwxr-xr-x" : "-rw-r--r--";
  const size = humanReadable ? humanSize(e.size) : String(e.size);
  return `${perms}  1 fernando  staff  ${size.padStart(7)}  ${lsDisplayName(e)}`;
}

const HELP_LINES = [
  "available commands:",
  "  help              show this list",
  "  whoami            who is running this shell",
  "  ls [-lah] [dir]   list files (try: ls -la)",
  "  cat <file>        print a file's contents (scripts show source)",
  "  ./<script>        run an executable script (try: ./now.sh)",
  "  cd <posts|resume|~>  navigate to a page",
  "  open <target>     open a project or file (try: open resume.pdf)",
  "  projects          list side projects",
  "  contact           print contact info",
  "  matrix            ...",
  "  echo <text>       print text back",
  "  clear             clear the terminal",
];

export const COMMAND_NAMES = [
  "help",
  "whoami",
  "ls",
  "cat",
  "cd",
  "projects",
  "open",
  "contact",
  "matrix",
  "sudo",
  "echo",
  "clear",
  ...EXECUTABLES,
];

// Tab-completion candidates for the argument that follows each command,
// so completion works past the first word, not just on command names.
export const ARG_CANDIDATES: Record<string, string[]> = {
  cat: ["about.md", "now.sh", "contact.sh", "resume.pdf", "posts/", ".zshrc"],
  ls: ["about.md", "now.sh", "contact.sh", "resume.pdf", "posts/", ".zshrc"],
  cd: ["posts", "resume", "~"],
  open: ["menuop", "northbots", "resume.pdf"],
};

function stripSlash(s: string): string {
  return s.replace(/\/$/, "");
}

function projectLines(): string[] {
  return sideProjects.map(
    (p) => `${p.name.padEnd(16)} ${p.status.padEnd(8)} ${p.desc}`
  );
}

export function runCommand(raw: string, ctx: CommandCtx): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [] };

  const [cmdRaw, ...args] = trimmed.split(/\s+/);
  const cmd = cmdRaw.toLowerCase();

  if (cmd.startsWith("./")) {
    const name = cmd.slice(2);
    if (SCRIPTS[name]) return { lines: SCRIPTS[name] };
    if (DIRECTORIES.includes(stripSlash(name)) || FILES[name]) {
      return { lines: [`bash: ${cmd}: Permission denied`] };
    }
    return { lines: [`bash: ${cmd}: No such file or directory`] };
  }

  switch (cmd) {
    case "help":
      return { lines: HELP_LINES };

    case "whoami":
      return {
        lines: ["Fernando Trevino — Lead Architect @ Siemens"],
      };

    case "ls": {
      const pathArgs = args.filter((a) => !a.startsWith("-"));
      const flags = args
        .filter((a) => a.startsWith("-"))
        .join("")
        .replace(/-/g, "");
      const showAll = flags.includes("a");
      const longFormat = flags.includes("l");
      const humanReadable = flags.includes("h");

      const arg = pathArgs[0] ? stripSlash(pathArgs[0]) : "";

      if (arg === "posts") {
        return {
          lines: ["posts are rendered per-page — run `cd posts` to browse them all."],
        };
      }

      if (!arg) {
        const entries = LS_ENTRIES.filter((e) => showAll || !e.hidden);
        if (longFormat) {
          return { lines: entries.map((e) => lsLongLine(e, humanReadable)) };
        }
        return { lines: [entries.map(lsDisplayName).join("  ")] };
      }

      const target = arg === "resume" ? "resume.pdf" : arg;
      const entry = LS_ENTRIES.find((e) => e.name === target);
      if (!entry) {
        return {
          lines: [`ls: cannot access '${pathArgs[0]}': No such file or directory`],
        };
      }
      return {
        lines: [longFormat ? lsLongLine(entry, humanReadable) : lsDisplayName(entry)],
      };
    }

    case "cat": {
      const file = args[0];
      if (!file) return { lines: ["usage: cat <file>"] };

      if (file === "resume.pdf") {
        return {
          lines: ["cat: resume.pdf: binary file (try `open resume.pdf`)"],
        };
      }
      if (DIRECTORIES.includes(stripSlash(file))) {
        return { lines: [`cat: ${file}: Is a directory`] };
      }
      if (SCRIPTS[file]) {
        return { lines: scriptSource(file) };
      }
      const content = FILES[file];
      if (!content) {
        return { lines: [`cat: ${file}: No such file or directory`] };
      }
      return { lines: content };
    }

    case "cd": {
      const dest = stripSlash((args[0] || "~").replace(/^\//, ""));
      if (dest === "resume") {
        ctx.router.push("/resume");
        return { lines: ["cd /resume"] };
      }
      if (dest === "posts") {
        ctx.router.push("/posts");
        return { lines: ["cd /posts"] };
      }
      if (dest === "~" || dest === "" || dest === "home") {
        ctx.router.push("/");
        return { lines: ["cd ~"] };
      }
      return { lines: [`cd: ${args[0]}: No such file or directory`] };
    }

    case "projects":
      return { lines: projectLines() };

    case "open": {
      const nameArg = (args[0] || "").toLowerCase();

      if (nameArg === "resume.pdf" || nameArg === "resume") {
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        return { lines: ["opening resume.pdf..."] };
      }

      const project = sideProjects.find(
        (p) => p.url && p.name.toLowerCase().startsWith(nameArg)
      );
      if (!project || !project.url) {
        return { lines: [`open: ${args[0] || ""}: no matching project or file`] };
      }
      window.open(project.url, "_blank", "noopener,noreferrer");
      return { lines: [`opening ${project.url}...`] };
    }

    case "contact":
      return { lines: [contact.heading, contact.email] };

    case "matrix":
      ctx.toggleMatrix();
      return { lines: ["entering the matrix... (press esc to exit)"] };

    case "sudo": {
      const rest = args.join(" ").toLowerCase();
      if (rest === "hire fernando") {
        return {
          lines: [
            "permission granted.",
            `mailto:${contact.email}`,
            "he's expecting your email.",
          ],
        };
      }
      return { lines: ["permission denied: nice try."] };
    }

    case "echo":
      return { lines: [args.join(" ")] };

    case "clear":
      return { lines: [], sideEffect: "clear" };

    default:
      return { lines: [`command not found: ${cmdRaw}`] };
  }
}
