import { Button } from "@/components/ui/Button";

function App() {
  return (
    <div className="flex justify-center items-center flex-col mt-32">
      <h1 className="text-3xl font-bold">composeui</h1>

      <p className="font-mono mt-8 text-xl">AWS Console for Desktop</p>

      <Button size={"sm"} variant={"outline"} className="rounded-full mt-4">
        Discover
      </Button>
    </div>
  );
}

export default App;
