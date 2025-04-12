import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/*
  This script copies the this app's API types to the api-types package.
  Why? So the FE apps can consume them via a package per proper monorepo conventions.

  Apps should be dependencies of other apps or packages.
  But it's pretty annoying to define your API and DB stuff in separate packages.
  
  Note that the tsup --onSuccess flag doesn't necessarily execute after types have finished compiling,
  so the script will wait a bit. The tsup config also specifies to clean the dist directory
  before executing, so it may not be present when the script runs (hence retries).
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const target = "packages/api-types/index.ts";
const inputFile = resolve(__dirname, "../dist/index.d.ts");
const outputFile = resolve(__dirname, `../../../${target}`);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function generateTypes(retries = 6, delayMs = 500): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await wait(delayMs);

      const content = readFileSync(inputFile, "utf-8");
      writeFileSync(outputFile, content);

      console.log(`✅ API type generation succeeded: ${target} (attempt ${attempt}/${retries})`);
      return;
    } catch (error) {
      if (attempt === retries) {
        console.error(`❌ API type generation failed: ${retries} attempts: ${(error as Error).message}`);
        process.exit(1);
      }
      console.log(`⚠️ API type generation retrying: ${attempt}/${retries} failed...`);
    }
  }
}

generateTypes();
