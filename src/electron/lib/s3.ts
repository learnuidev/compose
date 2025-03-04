import {
  S3Client,
  ListBucketsCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";

const createClient = (profile: string, region: string) => {
  const credentials = fromIni({ profile });

  const client = new S3Client({ region: region, credentials: credentials });
  return client;
};

export async function listBuckets({
  profile,
  region,
}: {
  profile: string;
  region: string;
}) {
  const client = createClient(profile, region);
  try {
    const data = await client.send(new ListBucketsCommand({}));
    // console.log("Success", data.Buckets);
    return data.Buckets;
  } catch (error) {
    console.error("Error", error);
  }
}

export async function listObjects({
  profile,
  region,
  bucketName,
}: {
  profile: string;
  region: string;
  bucketName: string;
}) {
  const client = createClient(profile, region);

  try {
    const data = await client.send(
      new ListObjectsCommand({ Bucket: bucketName })
    );

    // console.log("Success", data.Contents);
    return data.Contents;
  } catch (error) {
    console.error("Error", error);
  }
}
