import { CommonRoutes } from "./commonRoutes";
import { ProjectRoutes } from "./projectsRoutes";
import { JudgementRoutes } from "./judgementRoutes";
import { AnalysesRoutes } from "./analysesRoutes";

export const MainRoutes = [
  {
    mainPath: "/",
    routes: CommonRoutes,
  },
  {
    mainPath: "/analysis",
    routes: AnalysesRoutes,
  },
  {
    mainPath: "/projects",
    routes: ProjectRoutes,
  },
  {
    mainPath: "/judgement",
    routes: JudgementRoutes,
  }
];