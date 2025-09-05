import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, BarChart3 } from "lucide-react";
import { projects } from "@/config/constants";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-4xl font-bold text-foreground mb-4">
              Your Projects
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="bg-card/50 border-border hover:bg-card/80 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.type}
                      </p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-green-500/20 text-green-400 border-green-500/30 ml-2"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {project.documents} documents
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {project.analyses} {project.analyses === 1 ? 'analysis' : 'analyses'}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Open Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;