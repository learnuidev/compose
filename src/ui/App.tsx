import { Button } from "@/src/components/ui/Button";
import { useAWSCredentials } from "./hooks/use-aws-credentials";

function App() {
  const stats = useAWSCredentials();
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center flex-col mt-32">
        <h1 className="text-3xl font-bold">compose</h1>

        <p className="font-mono mt-4 text-xl">AWS Console for Desktop</p>

        <code>
          <pre>{JSON.stringify(stats, null, 4)}</pre>
        </code>
        <Button
          size={"sm"}
          // variant={"outline"}
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

export default App;
