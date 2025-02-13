import { useEffect, useState } from "react";

export function useAWSCredentials(): Statistics {
  const [value, setValue] = useState<Statistics>();

  useEffect(() => {
    const unsub = window.electron.subscribeAWSCredentials((stats) =>
      setValue((prev) => {
        return stats;
      })
    );
    return unsub;
  }, []);

  return value;
}
