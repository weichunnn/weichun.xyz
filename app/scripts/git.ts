import { execSync } from "child_process";

export function getChangedFiles(extension: string) {
  const extensionFilter = extension ? `-- '*.${extension}'` : "";
  const command = `git diff HEAD^ HEAD --name-only ${extensionFilter}`;
  const diffOutput = execSync(command);

  return diffOutput.toString().split("\n").filter(Boolean);
}
