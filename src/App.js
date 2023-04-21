import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useAuthContext } from "./context/authContext";
import Routers from "./router/Routers";

function App() {
  const queryClient = new QueryClient();
  const { isDarkMode } = useContext(DarkModeContext);
  const { currentUser } = useAuthContext();
  console.log("currentUser in app", currentUser);

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
