import { Button } from "@/src/components/ui/button";
import { useAWSCredentials } from "../hooks/use-aws-credentials";
import { useTheme } from "@/src/components/theme-provider";
import { ThggleTheme } from "@/src/components/toggle-theme";

export function Compose() {
  const { setTheme } = useTheme();
  const stats = useAWSCredentials();
  return (
    <div className="p-4">
      <ThggleTheme />
      <div className="flex justify-center items-center flex-col mt-32">
        <h1 className="text-3xl sm:text-7xl lg:text-9xl font-bold">compose</h1>

        <p className="font-mono mt-4 lg:text-5xl sm:text-2xl text-xl dark:text-gray-400">
          AWS Console for Desktop
        </p>

        <Button
          className="rounded-full mt-8 cursor-pointer p-4"
          onClick={() => {
            alert("composeui");
          }}
        >
          Discover Compose
        </Button>
      </div>
    </div>
  );
}
