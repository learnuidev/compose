import { ThggleTheme } from "@/src/components/toggle-theme";
import { Button } from "@/src/components/ui/button";

export function Compose() {
  return (
    <div className="p-4">
      <ThggleTheme />
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
