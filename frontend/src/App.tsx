import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./screens/commonMainDetailsPage/CommonMainDetails";
import Dashboard from "./screens/dashboard/Dashboard";
import Projects from "./screens/projects/Projects";
import Tools from "./screens/tools/CurrentAnalyses";
import Login from "./screens/login/Login";
import NotFound from "./screens/notFound/NotFound";
import { MainContentLayout } from "./layout/MainContentLayout";
import { MainRoutes } from "./routes";
import ProtectRoute from "./protectRoute";
import { COMMON_PROTECT_ROUTE_PATH } from "./config/constants";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <AuthContextProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainContentLayout>
          <Routes>
            {MainRoutes.map((routesDetails, index) => (
              <Route path={routesDetails.mainPath} key={index}>
                {routesDetails.routes.map((subRoutes, index) => (
                  <Route
                    key={index}
                    path={subRoutes.path}
                    element={
                      <ProtectRoute
                        protectRoutes={subRoutes.protectRoutes}
                        redirectTo={COMMON_PROTECT_ROUTE_PATH}
                      >
                        {subRoutes.route}
                      </ProtectRoute>
                    }
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </MainContentLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthContextProvider>
);

export default App;
