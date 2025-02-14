import { ThemeProvider } from "../components/theme-provider";
import { Compose } from "./compose/compose";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Compose />
    </ThemeProvider>
  );
}

export default App;
