// tools/syncFiles.js
import fs from "fs";
import path from "path";

// === CONFIGURATION ===
const sourceBase = "C:/Users/brody/Desktop/urban-resource-map-admin";
const targetBase = "C:/Users/brody/Desktop/urban-resource-map-client";

const filesToUpdate = [
  "server.js",
  "db.js",
  "routes/projectSchema.js",
  "src/components/FilterPanel.jsx",
  "src/pages/Home.jsx",
  "src/utils/schemaFetcher.js",
];

// === SYNC FUNCTION ===
filesToUpdate.forEach((relativePath) => {
  const sourcePath = path.join(sourceBase, relativePath);
  const targetPath = path.join(targetBase, relativePath);

  try {
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Source file not found: ${relativePath}`);
      return;
    }
    if (!fs.existsSync(targetPath)) {
      console.error(`❌ Target file not found: ${relativePath}`);
      return;
    }

    const fileContents = fs.readFileSync(sourcePath, "utf8");
    fs.writeFileSync(targetPath, fileContents, "utf8");
    console.log(`✅ Synced: ${relativePath}`);
  } catch (err) {
    console.error(`❌ Error syncing ${relativePath}:`, err.message);
  }
});
