#!/usr/bin/env node
import puppeteer from "puppeteer";
import { spawn } from "child_process";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 3099;
const URL = `http://localhost:${PORT}/resume`;
const OUT = path.join(ROOT, "public", "resume.pdf");

function startServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("node_modules/.bin/next", ["start", "-p", String(PORT)], {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    });

    proc.stdout.on("data", (data) => {
      const line = data.toString();
      if (line.includes("Ready")) resolve(proc);
    });

    proc.stderr.on("data", (data) => process.stderr.write(data));
    proc.on("error", reject);

    setTimeout(() => reject(new Error("Server did not start in time")), 20000);
  });
}

console.log("Building...");
const build = spawn("node_modules/.bin/next", ["build"], { cwd: ROOT, stdio: "inherit" });
await new Promise((resolve, reject) => {
  build.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Build failed (exit ${code})`))));
});

console.log("Starting server...");
const server = await startServer();

try {
  console.log("Generating PDF...");
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 15000 });
  await page.pdf({
    path: OUT,
    format: "A4",
    printBackground: false,
    margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
  });
  await browser.close();
  console.log(`✓ PDF saved to public/resume.pdf`);
} finally {
  server.kill();
}
