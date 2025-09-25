import { WitnessAnalyserDashboard } from "@/screens/analysisDashboard/WitnessAnalyserDashboard";
import { AnalysisResults } from "@/screens/analysisResults/AnalysisResults";
import CreateProject from "@/screens/createProject/CreateProject";
import EditProject from "@/screens/editProject/EditProject";
import { ProjectDetailsView } from "@/screens/projectDetailsView/ProjectDetailsView";
import Projects from "@/screens/projects/Projects";

export const ProjectRoutes = [
  {
    path: "",
    route: <Projects />,
    protectRoutes: false,
  },
  {
    path: "project-view/:id",
    route: <ProjectDetailsView />,
    protectRoutes: false,
  },
    {
    path: "project-analyses-view/:id",
    route: <WitnessAnalyserDashboard />,
    protectRoutes: false,
  },
  {
    path: "create-project",
    route: <CreateProject />,
    protectRoutes: false,
  },
   {
    path: "edit-project/:id",
    route: <EditProject />,
    protectRoutes: false,
  },
   {
    path: "project-analyses-result-view/:id",
    route: <AnalysisResults />,
    protectRoutes: false,
  }
];


