// tools/folderGenerator.js
import fs from 'fs';
import path from 'path';

// Modify this to build any folder structure you want
const structure = {
  'exampleFolder': ['file1.js', 'file2.js'],
  'anotherFolder': ['example.md'],
  'nested/folder/structure': ['notes.txt']
};

const baseDir = process.cwd(); // This will create folders relative to where you run the script

function generate(structure, overwrite = false) {
  for (const folder in structure) {
    const folderPath = path.join(baseDir, folder);

    // Create folder (recursive for nested folders)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📂 Created folder: ${folderPath}`);
    }

    // Create files inside folder
    structure[folder].forEach(file => {
      const filePath = path.join(folderPath, file);

      if (fs.existsSync(filePath) && !overwrite) {
        console.log(`⚠️  Skipped existing file: ${filePath}`);
      } else {
        fs.writeFileSync(filePath, `// ${file}\n\n// TODO: Add code here.`);
        console.log(`${overwrite ? '♻️ Overwrote' : '📝 Created'} file: ${filePath}`);
      }
    });
  }

  console.log('\n🎉 Folder structure generation complete!');
}

// Run the generator
generate(structure, false); // Set to true if you want to force overwrite
