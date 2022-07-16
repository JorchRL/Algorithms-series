const originalsPath = "./posts";
const hashnodePath = "./hashnode_version";

function loopDirAndUpdate(path: string, newPath: string) {
  for (const dirEntry of Deno.readDirSync(path)) {
    const filename = dirEntry.name;

    let data = Deno.readTextFileSync(`${path}/${filename}`);

    //replace $***$ from inline equations
    data = data.replaceAll(/\$.+?\$/gm, (e) => {
      // e holds the inline equation
      if (e.slice(0, 2) !== "$$") { // skip block math
        //TODO: currently, $****$. is not matched. I have to fix that.

        e = `\\\\(${e.slice(1, e.length - 1)}\\\\)`; // change $****$ to \\(****\\)
      }
      return e;
    });
    const newFile = Deno.createSync(`${newPath}/${filename}`);
    Deno.writeTextFileSync(`${newPath}/${filename}`, data);
  }
}

loopDirAndUpdate(originalsPath, hashnodePath);
