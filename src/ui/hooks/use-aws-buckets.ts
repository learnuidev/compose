import { useEffect, useState } from "react";
// import { ipcRenderer } from "electron";

export function useListAWSBuckets() {
  const [value, setValue] = useState([]);

  window.electron.listAWSBuckets({
    region: "us-east-1",
    profile: "yoserverless",
  });

  // useEffect(() => {
  //   window.electron.listAWSBuckets({
  //     region: "us-east-1",
  //     profile: "yoserverless",
  //   });
  //   // ipcRenderer.send("list-buckets", {
  //   //   region: "us-east-1",
  //   //   profile: "yoserverless",
  //   // });
  //   // const unsub = window.electron.subscribeListAWSBuckets((buckets: any) =>
  //   //   setValue(buckets)
  //   // );
  //   // return unsub;
  // }, []);

  const unsub = window.electron.listAWSBucketsSuccess((stats) =>
    setValue(stats)
  );
  // return unsub;

  // useEffect(() => {
  //   const unsub = window.electron.listAWSBucketsSuccess((stats) =>
  //     setValue(stats)
  //   );
  //   return unsub;
  // }, []);

  return value;
}
