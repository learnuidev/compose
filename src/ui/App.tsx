import { Button } from "@/components/ui/Button";

function App() {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center flex-col mt-32">
        <h1 className="text-3xl font-bold">compose</h1>

        <p className="font-mono mt-4 text-xl">AWS Console for Desktop</p>

        <Button
          size={"sm"}
          variant={"outline"}
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
