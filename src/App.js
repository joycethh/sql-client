import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkModeContext } from "./context/darkModeContext";
import Routers from "./router/Routers";

function App() {
  const queryClient = new QueryClient();
  const { isDarkMode } = useDarkModeContext();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className={`theme-${isDarkMode ? "dark" : "light"}`}>
            <Routers />
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
