import { projects } from "@/config/constants";
import { ProjectCard } from "./component/ProjectCard";
import { useNavigate } from "react-router-dom";
import { useGetAllProject } from "@/api/project";
import Loading from "@/components/Loading";

const Projects = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetAllProject();

  if (isLoading || isFetching) {
    <Loading />;
  }    

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-5">
        <div className="mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-3xl font-bold text-primary">
              Your Projects
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {data?.map((project, index) => (
              <ProjectCard
                title={project.title}
                status={project.status}
                documents={project.noOfDocuments}
                analyses={project.noOfAnalyses}
                onOpen={() => navigate(`/projects/project-view/${project.projectId}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
