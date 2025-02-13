import { app, BrowserWindow } from "electron";
import path from "path";
import { pollResources } from "./resource-manager.js";
import { isDev } from "./utils/is-dev.js";
import { getPreloadPath } from "./path-resolver.js";
import { sendAWSCredentials } from "./subscriptions/aws-credentails/send-aws-credentials.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
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
});
