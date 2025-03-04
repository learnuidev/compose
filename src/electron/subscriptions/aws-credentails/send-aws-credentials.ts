const pollingInterval = 500;
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "../../util.js";
import { subscriptionIds } from "../subsription-ids.js";
import { loadAWSCredentials } from "./load-aws-credentials.js";

export function sendAWSCredentials(mainWindow: BrowserWindow) {
  const credentials = loadAWSCredentials();

  ipcWebContentsSend(
    subscriptionIds["aws-credentials"],
    mainWindow.webContents,
    credentials
  );
}
