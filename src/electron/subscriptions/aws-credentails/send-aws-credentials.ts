const pollingInterval = 50000;
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "../../util.js";
import { subscriptionIds } from "../subsription-ids.js";
import { loadAWSCredentials } from "./load-aws-credentials.js";

export function sendAWSCredentials(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const credentials = loadAWSCredentials();

    console.log("CREDENTIALS", credentials);

    ipcWebContentsSend(
      subscriptionIds["aws-credentials"],
      mainWindow.webContents,
      credentials
    );
  }, pollingInterval);
}
