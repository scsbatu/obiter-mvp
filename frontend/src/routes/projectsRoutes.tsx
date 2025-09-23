import { WitnessAnalyserDashboard } from "@/screens/analysisDashboard/WitnessAnalyserDashboard";
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
    path: "project-view",
    route: <ProjectDetailsView />,
    protectRoutes: false,
  },
    {
    path: "project-analyses-view",
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
];


