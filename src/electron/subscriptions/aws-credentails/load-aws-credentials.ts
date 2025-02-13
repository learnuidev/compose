/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from "fs";
import path from "path";
import os from "os";

export function loadAWSCredentials() {
  const homeDir = os.homedir();
  const credentialsPath = path.join(homeDir, ".aws", "credentials");
  const configPath = path.join(homeDir, ".aws", "config");

  // @ts-ignore
  function parseIniFile(filePath: any) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    const profiles = {};
    // @ts-ignore
    let currentProfile = null;

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith("[") && line.endsWith("]")) {
        currentProfile = line.slice(1, -1);
        // @ts-ignore
        profiles[currentProfile] = {};
        // @ts-ignore
      } else if (currentProfile && line.includes("=")) {
        const [key, value] = line.split("=").map((part) => part.trim());
        // @ts-ignore
        profiles[currentProfile][key] = value;
      }
    });

    return profiles;
  }

  try {
    const credentials = parseIniFile(credentialsPath);
    const config = parseIniFile(configPath);

    // Merge credentials and config
    const profiles = { ...credentials, ...config };

    return profiles;
  } catch (error) {
    // @ts-ignore
    console.error("Error loading AWS credentials:", error.message);
    return null;
  }
}
