// tools/syncFiles.js
import fs from "fs";
import path from "path";

// === CONFIGURATION ===
const sourceBase = "C:/Users/brody/Desktop/urban-resource-map-admin";
const targetBase = "C:/Users/brody/Desktop/urban-resource-map-dev";

const filesToUpdate = [
  "server.js",
  "src/db.js",
  "src/routes/locations.js",
  "src/routes/projectSchema.js",
  "src/App.jsx",
  "src/components/FilterPanel.jsx",
  "src/pages/Home.jsx",
  "src/pages/Editor.jsx",
  "src/pages/Analysis.jsx",
  "src/components/AddLocationModal.jsx",
  "src/components/EditLocation.jsx",
  "src/components/EditScoreModal.jsx",
  "src/utils/schemaFetcher.js",
  "src/utils/locationHelpers.js",
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
