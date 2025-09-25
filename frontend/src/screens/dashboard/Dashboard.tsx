import { Card, CardContent } from "@/components/ui/card";
import { dashboardCard } from "@/config/constants";
import {} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigation = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-5 mb-10">
        <div className="max-w-8xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-3xl font-bold text-primary mb-4">
              Welcome to Obiter AI
            </h1>
            <p className="text-1xl text-white">
              Legal Tradition, Enhanced Intelligence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 mb-12">
            {dashboardCard.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-card/5 border-border hover:bg-card/10 transition-all duration-300 cursor-pointer group"
                  onClick={() => navigation(feature?.navigationPath)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-light-gold">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Card className="bg-card/5 border-border">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Interactive Demo
              </h2>
              <p className="text-light-gold leading-relaxed">
                This is a single-page demo of the Obiter AI platform. Click the
                navigation links above to explore different sections without any
                404 errors.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
