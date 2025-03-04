import fs from "fs";

const pollingInterval = 500;
import osUtils from "os-utils";
import { ipcWebContentsSend } from "./util.js";
import { BrowserWindow } from "electron";
import os from "os";

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();

    // console.log("RAM", ramUsage);
    // console.log("CPU USAGE", cpuUsage);

    ipcWebContentsSend("statistics", mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage: storageData.usage,
    });
  }, pollingInterval);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
}

export function getCpuUsage() {
  return new Promise((resolve, reject) => {
    try {
      osUtils.cpuUsage(resolve);
    } catch (err) {
      reject(err);
    }
  });
}

export function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  // requires node 18
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
