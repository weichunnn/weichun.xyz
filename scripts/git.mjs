import { execSync } from "child_process";

export function getChangedFiles(extension) {
  const extensionFilter = extension ? `-- '*.${extension}'` : ""; // Corrected the wildcard pattern
  const command = `git diff HEAD^ HEAD --name-only ${extensionFilter}`;
  console.log(command);
  const diffOutput = execSync(command); // Pass the command directly to execSync

  return diffOutput.toString().split("\n").filter(Boolean);
}
