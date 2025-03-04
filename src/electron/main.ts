import { app, BrowserWindow } from "electron";
import path from "path";
import { pollResources } from "./resource-manager.js";
import { isDev } from "./utils/is-dev.js";
import { getPreloadPath } from "./path-resolver.js";
import { sendAWSCredentials } from "./subscriptions/aws-credentails/send-aws-credentials.js";
import { ipcMain, net } from "electron";
import { listBuckets } from "./lib/s3.js";
import { ipcMainHandle, ipcWebContentsSend } from "./util.js";
// import { subscriptionIds } from "./subscriptions/subsription-ids.js";

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // disables default system frame (dont do this if you want a proper working menu bar)
    // frame: false,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  sendAWSCredentials(mainWindow);

  ipcMainHandle("list-buckets", async (data) => {
    console.log("DATA", data);
    const region = data?.region || "us-east-1";
    const profile = data?.profile || "yoserverless";
    const buckets = await listBuckets({
      region,
      profile,
    });

    ipcWebContentsSend("list-buckets-success", mainWindow.webContents, buckets);
  });
});

// ipcMain.on("list-buckets", async (event, data) => {
//   const region = data?.region || "us-east-1";
//   const profile = data?.profile || "yoserverless";
//   const buckets = await listBuckets({
//     region,
//     profile,
//   });
//   // const buckets = [];

//   mainWindow.webContents.send("aws-buckets", buckets);
// });
