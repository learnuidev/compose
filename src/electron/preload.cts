import { subscriptionIds } from "./subscriptions/subsription-ids";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) =>
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),

  subscribeAWSCredentials: (callback) =>
    ipcOn("aws-credentials", (stats) => {
      callback(stats);
    }),

  listAWSCredentials: (callback: any) => {
    ipcInvoke("list-aws-credentials", callback);
  },
  listAWSCredentialsSuccess: (callback: any) => {
    ipcOn("list-aws-credentials-success", (buckets) => {
      callback(buckets);
    });
    // ipcInvoke("list-aws-credentials", callback);
  },

  listAWSBuckets: (callback: any) => {
    ipcInvoke("list-buckets", callback);
  },
  listAWSBucketsSuccess: (callback: any) => {
    ipcOn("list-buckets-success", (buckets) => {
      callback(buckets);
    });
  },
  // ipcOn("aws-buckets", (buckets) => {
  //   callback(buckets);
  // }),

  subscribeChangeView: (callback) =>
    ipcOn("changeView", (view) => {
      callback(view);
    }),

  getStaticData: () => ipcInvoke("getStaticData"),
  sendFrameAction: (payload) => ipcSend("sendFrameAction", payload),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  properties: any
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key, properties);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key]
) {
  electron.ipcRenderer.send(key, payload);
}
