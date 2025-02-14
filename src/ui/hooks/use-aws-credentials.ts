import { useEffect, useState } from "react";

export function useAWSCredentials(): Statistics {
  const [value, setValue] = useState<Statistics>();

  useEffect(() => {
    const unsub = window.electron.subscribeAWSCredentials((stats) =>
      setValue((prev) => {
        return Object.entries(stats)
          .filter((item) => {
            const [_, vals] = item;
            return vals?.aws_access_key_id;
          })
          ?.map((item) => {
            const [profile, credentials] = item;
            return {
              profile,
              awsAccessKeyId: credentials?.aws_access_key_id,
              awsSecretAccesskey: credentials?.aws_secret_access_key,
            };
          });
      })
    );
    return unsub;
  }, []);

  return value;
}
