import { useEffect, useState } from "react";

export function useAWSCredentials() {
  const [value, setValue] = useState([]);

  useEffect(() => {
    window.electron.listAWSCredentials({
      region: "us-east-1",
      profile: "yoserverless",
    });
  }, []);

  useEffect(() => {
    const unsub = window.electron.listAWSCredentialsSuccess(
      (stats) =>
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
      // setValue(stats)
    );
  }, []);

  return value;
}
