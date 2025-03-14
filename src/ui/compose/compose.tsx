import { ToggleTheme } from "@/src/components/toggle-theme";
import { Button } from "@/src/components/ui/button";
import { useAWSCredentials } from "../hooks/use-aws-credentials";
import { useListAWSBuckets } from "../hooks/use-aws-buckets";
import { ProfileDropdown } from "@/src/components/profile-dropdown";

export function Compose() {
  const credentials = useAWSCredentials();

  const buckets = useListAWSBuckets();

  console.log("buckets", buckets);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <ToggleTheme />
        <ProfileDropdown />
      </div>
      <div className="flex justify-center items-center flex-col mt-32">
        <h1 className="lg:text-8xl text-5xl font-bold">compose</h1>

        <p className="lg:text-3xl font-mono text-xl mt-4 lg:mt-8 text-center dark:text-gray-400">
          AWS Console for Desktop
        </p>

        <Button
          className="rounded-full mt-8 cursor-pointer p-4"
          onClick={() => {
            alert("composeui");
          }}
        >
          Discover Apps
        </Button>
      </div>
    </div>
  );
}
