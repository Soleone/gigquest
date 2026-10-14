#!/usr/bin/env node
// Records the README loop and the hero from the production build: Betty's first job, task 1 typed and passed,
// then task 2. The hero is task 1 with the answer typed in, before it's checked.
// Usage: npm run media:capture (after npm run build). Needs agent-browser (with its browser installed) and FFmpeg on the PATH.
import { execFile, spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { record } from "@soleone/showcase/capture";

const exec = promisify(execFile);
const media = path.resolve("demo/media");
const port = String(4400 + (process.pid % 500));
const shows = (text) => `document.body.innerText.includes(${JSON.stringify(text)})`;
const click = (label) => `[...document.querySelectorAll('button')].find((button) => button.textContent.trim() === ${JSON.stringify(label)}).click()`;
// Types the answer at the end of the starter code, one key at a time through Monaco's own type command,
// starting a new line only if the last one has code on it.
const typeAnswer = (code) => `(async () => {
  const editor = monaco.editor.getEditors()[0];
  const model = editor.getModel();
  const last = model.getLineCount();
  editor.focus();
  editor.setPosition({ lineNumber: last, column: model.getLineMaxColumn(last) });
  const text = (model.getLineContent(last).trim() ? "\\n" : "") + ${JSON.stringify(code)};
  for (const key of text) {
    editor.trigger("keyboard", "type", { text: key });
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  return true;
})()`;

const server = spawn("node_modules/.bin/next", ["start", "-p", port], { stdio: "ignore" });
const out = await mkdtemp(path.join(os.tmpdir(), "gigquest-capture-"));
const heroShot = path.join(out, "hero.png");
try {
  for (let tries = 0; ; tries++) {
    try { if ((await fetch(`http://127.0.0.1:${port}/job`)).ok) break; } catch {}
    if (tries > 60) throw new Error("next start did not answer");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const { frames, durationMs, grid } = await record({
    url: `http://127.0.0.1:${port}/job`,
    out: path.join(media, "demo.webp"),
    viewport: { width: 1280, height: 820 },
    width: 1088,
    attempts: 3,
    async start(page) {
      await page.waitFor(shows("Start Job"), { timeoutMs: 30_000 });
      await page.sleep(1500);
    },
    async drive(page) {
      const answer = (code) => page.run("eval", typeAnswer(code));
      await page.run("eval", click("Start Job"));
      // Betty's line and Chip's hint type themselves out.
      await page.waitFor(shows("assign it the value"), { timeoutMs: 30_000 });
      await page.sleep(1500);
      await answer("let sales = 450;");
      await page.sleep(600);
      await page.run("screenshot", heroShot);
      await page.run("eval", click("Finish"));
      await page.waitFor(shows("Task Complete!"), { timeoutMs: 10_000 });
      await page.sleep(2500);
      await page.run("eval", click("Next Task"));
      await page.waitFor(shows("the new value"), { timeoutMs: 30_000 });
      await page.sleep(1500);
      await answer("sales = 460;");
      await page.sleep(800);
      await page.run("eval", click("Finish"));
      await page.waitFor(shows("Task 2/5 complete"), { timeoutMs: 20_000 });
      await page.sleep(3000);
    },
  });
  await exec("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", heroShot, "-vf", "scale=1088:-1", path.join(media, "hero.png")]);
  console.log(`Wrote demo/media/demo.webp (${frames} frames, ${(durationMs / 1000).toFixed(1)} s) and demo/media/hero.png. Check the frames in ${grid}.`);
} finally {
  server.kill();
  await rm(out, { recursive: true, force: true });
}
