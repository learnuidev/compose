import { useAWSProfileStore } from "@/src/stores/aws-profile.store";
import { useEffect, useState } from "react";
// import { ipcRenderer } from "electron";

export function useListAWSBuckets() {
  const [value, setValue] = useState([]);

  const profile = useAWSProfileStore((state) => state.profile);

  useEffect(() => {
    window.electron.listAWSBuckets({
      region: "us-east-1",
      profile: profile,
    });
  }, []);

  useEffect(() => {
    const unsub = window.electron.listAWSBucketsSuccess((stats) =>
      setValue(stats)
    );
  }, []);

  return value;
}
