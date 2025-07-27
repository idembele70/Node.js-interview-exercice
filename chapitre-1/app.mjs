import { promises as fs } from 'fs';
async function readDirectory() {
  const files = await fs.readdir('chapitre-1', 'utf-8')
  console.log(files)
}

readDirectory()