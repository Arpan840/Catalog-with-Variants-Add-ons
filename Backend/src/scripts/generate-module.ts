import fs from 'fs';
import path from 'path';

const [,, rawName] = process.argv;

if (!rawName) {
  console.error('Please provide a module name (e.g. survey)');
  process.exit(1);
}

const singularName = rawName.toLowerCase();
const pluralName = singularName.endsWith('s') ? singularName : singularName + 's';

const folder = path.join('src', 'Controller', pluralName);

// Define files to create inside the folder
const files = [
  `${singularName}.controller.ts`,  // singular.controller.ts filename
  `${singularName}.service.ts`,
  `${singularName}.interface.ts`,
  `${singularName}.helper.ts`,
];

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
  files.forEach(file => {
    const filePath = path.join(folder, file);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `// ${file} for ${singularName}\n`, { encoding: 'utf-8' });
    }
  });
  console.log(`Module "${pluralName}" created with controller, service, interface, and helper files.`);
} else {
  console.log(`Module "${pluralName}" already exists.`);
}
