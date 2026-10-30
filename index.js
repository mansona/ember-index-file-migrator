import { rename } from "fs/promises";
import { join } from "path";
import walkSync from "walk-sync";

export async function migrate() {
  const files = walkSync('.', {globs: ['addon/**/*', 'app/**/*'], directories: false})

  for(let file of files) {
    let path = file.split('/');
    const match = /index\.(hbs|js|ts|gjs|gts)/.exec(path.at(-1))
    if(match) {
      const extension = match[1];

      // remove the index.ext
      path.pop();

      const lastDir = path.pop();
      path.push(`${lastDir}.${extension}`)

      await rename(file, join(...path))
    }
  }
}