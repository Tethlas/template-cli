const fs = require('fs');

const CURRENT_DIR = process.cwd();

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const originalFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(originalFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(originalFilePath, 'utf8');

      const writePath = `${CURRENT_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURRENT_DIR}/${newProjectPath}/${file}`);

      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  })
}

export default createDirectoryContents;
